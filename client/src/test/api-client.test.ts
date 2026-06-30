import { describe, beforeEach, afterEach, it, expect, jest } from "@jest/globals";
import { ApiClient } from "../api/apiClient";
import { API_URL } from "../config";

describe("ApiClient", () => {
  const baseUrl = API_URL ??"http://localhost:8000/";
  const token = "local-test-token";

  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe("get", () => {
    it("should perform a GET request with authorization header", async () => {
      const user = [
        { 
            username: "admin", 
            email: "", 
            is_staff: true,
        },
    ];

      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue(user),
      });

      const api = new ApiClient(baseUrl, () => token);

      const res = await await.get<typeof user>("/users");

      expect(fetch).toHaveBeenCalledWith(
        `${baseUrl}/users`, {
            headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer local-test-token",
          },
        }
      );

      expect(res).toEqual(res);
    });
  });
});
