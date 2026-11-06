import { XMLParser } from "fast-xml-parser";

const RSS_FEED_PATH = "/rss.xml";

interface HashnodePost {
  title: string;
  brief: string;
  slug: string;
  url: string;
  coverImage: { url: string } | null;
  publishedAt: string;
  readTimeInMinutes: number;
  tags: { name: string }[];
}

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "@_",
  textNodeName: "#text",
  cdataPropName: "#cdata",
  parseTagValue: false,
  trimValues: true,
});

const asRecord = (value: unknown): Record<string, unknown> | null =>
  typeof value === "object" && value !== null
    ? (value as Record<string, unknown>)
    : null;

const asArray = (value: unknown): unknown[] =>
  value === undefined || value === null
    ? []
    : Array.isArray(value)
      ? value
      : [value];

const getText = (value: unknown): string => {
  if (typeof value === "string") return value;
  const record = asRecord(value);
  if (!record) return "";
  const text = record["#cdata"] ?? record["#text"];
  return typeof text === "string" ? text : "";
};

const cleanText = (value: string): string =>
  value
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;|&#160;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/\s+/g, " ")
    .trim();

const getPublicationHost = (value: string): string | null => {
  try {
    const url = new URL(
      value.trim().includes("://") ? value.trim() : `https://${value.trim()}`,
    );
    return url.hostname || null;
  } catch {
    return null;
  }
};

const getPost = (value: unknown): HashnodePost | null => {
  const item = asRecord(value);
  if (!item) return null;

  const title = cleanText(getText(item.title));
  const rawUrl = getText(item.link) || getText(item.guid);
  const publishedAt = getText(item.pubDate);
  if (!title || !rawUrl || !publishedAt) return null;

  let url: URL;
  try {
    url = new URL(rawUrl);
  } catch {
    return null;
  }
  if (url.protocol !== "https:" && url.protocol !== "http:") return null;

  const content = getText(item["content:encoded"]);
  const wordCount = cleanText(content).split(/\s+/).filter(Boolean).length;
  const enclosure = asRecord(item.enclosure);
  const imageUrl = enclosure?.["@_url"];
  const tags = asArray(item.category)
    .map((category) => cleanText(getText(category)))
    .filter(Boolean)
    .map((name) => ({ name }));

  return {
    title,
    brief: cleanText(getText(item.description)),
    slug: url.pathname.split("/").filter(Boolean).at(-1) ?? url.pathname,
    url: url.toString(),
    coverImage:
      typeof imageUrl === "string" && imageUrl.length > 0
        ? { url: imageUrl }
        : null,
    publishedAt,
    readTimeInMinutes: Math.max(1, Math.ceil(wordCount / 200)),
    tags,
  };
};

export async function GET(): Promise<Response> {
  const configuredHost =
    process.env.HASHNODE_PUBLICATION_HOST ??
    process.env.NEXT_PUBLIC_MY_HASHNODE_URL ??
    "jasondee.hashnode.dev";
  const host = getPublicationHost(configuredHost);

  if (!host) {
    return Response.json(
      { message: "The configured Hashnode publication host is invalid." },
      { status: 500 },
    );
  }

  let response: Response;
  try {
    response = await fetch(`https://${host}${RSS_FEED_PATH}`, {
      next: { revalidate: 300 },
    });
  } catch (error) {
    console.error("Could not reach the Hashnode RSS feed:", error);
    return Response.json(
      { message: "Could not reach the Hashnode RSS feed." },
      { status: 502 },
    );
  }

  if (!response.ok) {
    const message = `Hashnode RSS feed returned HTTP ${response.status}.`;
    console.error(message);
    return Response.json({ message }, { status: 502 });
  }

  let parsed: unknown;
  try {
    parsed = parser.parse(await response.text());
  } catch (error) {
    console.error("Could not parse the Hashnode RSS feed:", error);
    return Response.json(
      { message: "Hashnode returned an invalid RSS feed." },
      { status: 502 },
    );
  }

  const rss = asRecord(asRecord(parsed)?.rss);
  const channel = asRecord(rss?.channel);
  if (!channel) {
    console.error("Hashnode returned an RSS document without a channel.");
    return Response.json(
      { message: "Hashnode returned an invalid RSS feed." },
      { status: 502 },
    );
  }

  const posts = asArray(channel.item)
    .map(getPost)
    .filter((post): post is HashnodePost => post !== null);

  return Response.json({ posts });
}
