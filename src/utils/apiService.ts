type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

class APIService {
  private readonly baseUrl: string;
  private readonly defaultHeaders: HeadersInit;

  constructor(
    baseUrl = "",
    defaultHeaders: HeadersInit = { "Content-Type": "application/json" },
  ) {
    this.defaultHeaders = defaultHeaders;
    this.baseUrl = baseUrl;
    if (!this.baseUrl) {
      console.warn("NEXT_PUBLIC_BACKEND_URL is not defined in environment variables");
    }
  }

  async request<TResponse = unknown>(
    endpoint: string,
    method: HttpMethod = "GET",
    payload?: unknown,
    headers: HeadersInit = {},
  ): Promise<TResponse> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method,
      headers: { ...this.defaultHeaders, ...headers },
      ...(payload !== undefined ? { body: JSON.stringify(payload) } : {}),
    });

    if (!response.ok) {
      let errorMessage = `Request failed with status ${response.status}`;
      try {
        const errorData: unknown = await response.json();
        if (
          typeof errorData === "object" &&
          errorData !== null &&
          "message" in errorData &&
          typeof errorData.message === "string"
        ) {
          errorMessage = errorData.message;
        }
      } catch {
        // Use the status-based message when the server does not return JSON.
      }
      throw new Error(errorMessage);
    }

    if (response.status === 204) {
      return undefined as TResponse;
    }

    return (await response.json()) as TResponse;
  }

  get = <TResponse = unknown>(
    endpoint: string,
    headers?: HeadersInit,
  ): Promise<TResponse> => {
    return this.request<TResponse>(endpoint, "GET", undefined, headers);
  };

  post = <TResponse = unknown>(
    endpoint: string,
    payload: unknown,
    headers?: HeadersInit,
  ): Promise<TResponse> => {
    return this.request<TResponse>(endpoint, "POST", payload, headers);
  };

  put = <TResponse = unknown>(
    endpoint: string,
    payload: unknown,
    headers?: HeadersInit,
  ): Promise<TResponse> => {
    return this.request<TResponse>(endpoint, "PUT", payload, headers);
  };

  delete = <TResponse = unknown>(
    endpoint: string,
    payload?: unknown,
    headers?: HeadersInit,
  ): Promise<TResponse> => {
    return this.request<TResponse>(endpoint, "DELETE", payload, headers);
  };
}

export default APIService;
