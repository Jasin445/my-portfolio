class APIService {
  #BASE_URL = null;

  constructor(
    baseUrl,
    defaultHeaders = { "Content-Type": "application/json" },
  ) {
    this.defaultHeaders = defaultHeaders;
    this.#BASE_URL = baseUrl ?? "";
    // Validate BASE_URL exists
    if (!this.#BASE_URL) {
      console.warn("VITE_BACKEND_URL is not defined in environment variables");
    }
  }

  // Generic request method
  async request(endpoint, method = "GET", payload = null, headers = {}) {
    try {
      const response = await fetch(`${this.#BASE_URL}${endpoint}`, {
        method,
        headers: { ...this.defaultHeaders, ...headers },
        ...(payload ? { body: JSON.stringify(payload) } : {}),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || `Request failed with status ${response.status}`,
        );
      }

      // Attempt to parse JSON, fallback to null if no content
      const data = await response.json().catch(() => null);
      return data;
    } catch (error) {
      const err = new Error(
        errorData.message || `Request failed with status ${response.status}`,
      );
      err.status = response.status; // attach status code
      throw err;
    }
  }

  // Convenience methods
  get = async (endpoint, headers) => {
    return await this.request(endpoint, "GET", null, headers);
  };

  post = async (endpoint, payload, headers) => {
    return await this.request(endpoint, "POST", payload, headers);
  };

  put = async (endpoint, payload, headers) => {
    return await this.request(endpoint, "PUT", payload, headers);
  };

  delete = async (endpoint, payload = null, headers) => {
    return await this.request(endpoint, "DELETE", payload, headers);
  };
}

export default APIService;
