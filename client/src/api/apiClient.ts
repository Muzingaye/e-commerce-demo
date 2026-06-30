import { API_URL } from "../config";

export class ApiClient {
  private readonly baseUrl: string | null = "";

  constructor(
    baseUrl: string | null,
    private readonly getToken: () => string | null,
  ) {
    this.baseUrl = baseUrl ?? API_URL;
  }

  async get<T>(endpoint: string): Promise<T> {
    const token = this.getToken();

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
        ...(token && {
          Authorization: `Bearer ${token}`,
        }),
      },
    });

    if (!response.ok) {
      throw new Error(`Request failed: ${response.status}`);
    }

    return response.json as Promise<T>;
  }

  async post<T>(endpoint: string, body: unknown): Promise<T> {
    const token = this.getToken();

    const resp = await fetch(`${this.baseUrl}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token && {
          Authorization: `Bearer ${token}`,
        }),
      },
      body: JSON.stringify(body),
    });

    if (!resp.ok) {
      throw new Error(`Request failed: ${resp.status}`);
    }

    return resp.json as Promise<T>;
  }
}
