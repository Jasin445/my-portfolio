"use client";

import { ArrowRight, Calendar, Clock, Pencil, RotateCcw } from "lucide-react";
import Footer from "../../components/Footer";
import Header from "../../components/ui/Header";
import { useGetArticlesFromHashnode } from "../../apis/queries";
import type { HashnodePost } from "../../apis/queries";
import "./articles-experience.css";

const ArticleCard = ({ article }: { article: HashnodePost }) => (
  <a href={article.url} target="_blank" rel="noreferrer" className="article-card">
    {article.coverImage?.url && <img src={article.coverImage.url} alt="" />}
    <div>
      {article.tags?.[0] && <span className="article-tag">{article.tags[0].name}</span>}
      <h3 className="article-card-title">{article.title}</h3>
      <p className="article-card-brief">{article.brief}</p>
      <div className="article-card-meta">
        <Clock size={12} />
        <span>{article.readTimeInMinutes} min read</span>
        <span aria-hidden="true">/</span>
        <span>
          {new Date(article.publishedAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </span>
      </div>
    </div>
  </a>
);

const TechnicalBlog = () => {
  const { loading, data, error, refetch } = useGetArticlesFromHashnode();
  const posts = data?.posts ?? [];
  const [featured, ...rest] = posts;

  return (
    <div className="article-universe">
      <div className="article-world-glow" aria-hidden="true" />
      <Header />
      <main className="article-layout">
        <section className="article-hero">
          <div className="article-hero-copy">
            <p className="article-signal">Field notes / Dispatches from the stack</p>
            <h1 className="article-headline">
              <span>Build.</span>
              <span className="article-headline-outline">Break.</span>
              <span className="article-headline-accent">Understand.</span>
            </h1>
            <p className="article-intro">
              Ideas, experiments, and hard-won lessons from making software.
              A living notebook from somewhere between the terminal and the
              finished thing.
            </p>
            <div className="article-hero-bottom">
              <a
                href="https://jasondee.hashnode.dev"
                target="_blank"
                rel="noreferrer"
                className="article-visit-link"
              >
                Enter the publication <ArrowRight size={15} />
              </a>
              <span className="article-hero-note">
                Independent signal
                <br />
                Updated from Hashnode RSS
              </span>
            </div>
          </div>
          <div className="article-orbit-stage" aria-hidden="true">
            <span className="article-orbit-ring" />
            <span className="article-orbit-ring" />
            <span className="article-orbit-ring" />
            <span className="article-orbit-core">
              Ideas
              <br />
              in orbit
            </span>
            <span className="article-orbit-label article-orbit-label-one">
              Curiosity // 001
            </span>
            <span className="article-orbit-label article-orbit-label-two">
              Make • Learn • Repeat
            </span>
          </div>
          <span className="article-coordinate" aria-hidden="true">
            09°04&apos;N / 07°29&apos;E &nbsp;—&nbsp; NIGERIA
          </span>
        </section>

        <section className="article-feed" aria-labelledby="article-feed-title">
          <div className="article-feed-heading">
            <div>
              <p className="article-signal">Transmission log</p>
              <h2 id="article-feed-title" className="article-feed-title">
                Notes from the field
              </h2>
            </div>
            <p className="article-feed-count">
              {loading
                ? "Syncing feed"
                : `${posts.length.toString().padStart(2, "0")} entries`}
              <br />
              HASHNODE / RSS
            </p>
          </div>

          {loading ? (
            <div className="article-state" role="status" aria-live="polite">
              <h3 className="article-state-title">Tuning into the signal…</h3>
              <p className="article-state-copy">
                Pulling the latest dispatches from the publication.
              </p>
              <div className="article-loading-line" />
              <div className="article-loading-line" />
            </div>
          ) : error ? (
            <div className="article-state" role="alert">
              <h3 className="article-state-title">Signal temporarily lost.</h3>
              <p className="article-state-copy">
                The article feed didn’t respond this time. The writing is still
                out there—try reconnecting, or jump straight to the publication.
              </p>
              <p className="article-state-copy">{error}</p>
              <div className="article-state-actions">
                <button
                  type="button"
                  onClick={refetch}
                  className="article-state-action"
                >
                  <RotateCcw size={14} /> Try again
                </button>
                <a
                  href="https://jasondee.hashnode.dev"
                  target="_blank"
                  rel="noreferrer"
                  className="article-state-action"
                >
                  Open Hashnode <ArrowRight size={14} />
                </a>
              </div>
            </div>
          ) : !featured ? (
            <div className="article-state">
              <h3 className="article-state-title">
                The page is still blank. The notebook isn’t.
              </h3>
              <p className="article-state-copy">
                No public dispatches have landed here yet. Check back soon, or
                explore the publication directly while the next idea takes shape.
              </p>
              <div className="article-state-actions">
                <a
                  href="https://jasondee.hashnode.dev"
                  target="_blank"
                  rel="noreferrer"
                  className="article-state-action"
                >
                  Explore publication <ArrowRight size={14} />
                </a>
              </div>
            </div>
          ) : (
            <>
              <a
                href={featured.url}
                target="_blank"
                rel="noreferrer"
                className="article-feature"
              >
                <div className="article-feature-art">
                  <span className="article-feature-art-label">
                    Latest dispatch / 001
                  </span>
                  {featured.coverImage?.url && (
                    <img
                      src={featured.coverImage.url}
                      alt={`Cover image for ${featured.title}`}
                    />
                  )}
                </div>
                <div className="article-feature-copy">
                  <span className="article-feature-index">
                    Featured transmission // 001
                  </span>
                  <h3 className="article-feature-title">{featured.title}</h3>
                  <p className="article-feature-brief">{featured.brief}</p>
                  <div className="article-tags">
                    {featured.tags?.map((tag) => (
                      <span key={tag.name} className="article-tag">
                        {tag.name}
                      </span>
                    ))}
                  </div>
                  <div className="article-feature-meta">
                    <Calendar size={12} />
                    {new Date(featured.publishedAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                    <span aria-hidden="true">/</span>
                    <Clock size={12} />
                    {featured.readTimeInMinutes} min read
                  </div>
                  <div className="article-read-link">
                    Read the field note <ArrowRight size={14} />
                  </div>
                </div>
              </a>

              {rest.length > 0 && (
                <div className="article-more">
                  <h3 className="article-feed-title">More articles</h3>
                  <div className="article-more-grid">
                    {rest.map((article) => (
                      <ArticleCard key={article.slug} article={article} />
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </section>
      </main>
      <Footer lightweight />
    </div>
  );
};

export default TechnicalBlog;
