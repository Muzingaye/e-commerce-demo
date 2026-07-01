import { ApiClient } from "../api/controller";
import { ApiUser } from "../api/user";
import type { User } from "../models/User";
import {
  describe,
  beforeEach,
  afterEach,
  it,
  expect,
  jest,
} from "@jest/globals";

jest.mock("./apiClient");

const MockedApiClient = ApiClient as jest.MockedClass<typeof ApiClient>;

describe("ApiUser", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    Object.defineProperty(window, "localStorage", {
      value: {
        getItem: jest.fn().mockReturnValue("fake-token"),
      },
      writable: true,
    });
  });

  it("should return the matching user when credentials are valid", async () => {
    const users: User[] = [
      {
        username: "admin",
        password: "test",
      } as User,
      {
        username: "mary",
        password: "abcd",
      } as User,
    ];

    MockedApiClient.prototype.get = jest.fn().mockReturnValue(users);
    const baseUrl = API_URL ?? "http://localhost:8000/";

    const apiUser = new ApiUser(`${baseUrl}`);

    const result = await apiUser.login({
      username: "john",
      password: "1234",
    } as User);

    expect(result).toEqual(users[0]);
    expect(MockedApiClient.prototype.get).toHaveBeenCalledWith("/users/");
  });

  it("should return null when no user matches", async () => {
    MockedApiClient.prototype.get = jest.fn().mockReturnValue([
      {
        username: "john",
        password: "1234",
      },
    ]);

    const apiUser = new ApiUser();

    const result = await apiUser.login({
      username: "unknown",
      password: "wrong",
    } as User);

    expect(result).toBeNull();
  });

  it("should return null when ApiClient throws", async () => {
    MockedApiClient.prototype.get = jest.fn(() => {
      throw new Error("Network error");
    });

    const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});

    const apiUser = new ApiUser();

    const result = await apiUser.login({
      username: "john",
      password: "1234",
    } as User);

    expect(result).toBeNull();
    expect(consoleSpy).toHaveBeenCalled();

    consoleSpy.mockRestore();
  });

  it("should create ApiClient with base_url and token provider", async () => {
    MockedApiClient.prototype.get = jest.fn().mockReturnValue([]);

    const apiUser = new ApiUser("http://localhost:3000");

    await apiUser.login({
      username: "john",
      password: "1234",
    } as User);

    expect(ApiClient).toHaveBeenCalledWith(
      "http://localhost:3000",
      expect.any(Function),
    );
  });
});
