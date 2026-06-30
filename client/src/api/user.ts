import type { User } from "../models/User";
import { API_URL } from "../config";
import { ApiClient } from "./apiClient";

export class ApiUser {
  base_url: string | null = "";
  constructor(base_url?: string) {
    this.base_url = base_url ?? API_URL;
  }

  async login(data: User): Promise<User | null> {
    try {
      const api = new ApiClient(this.base_url, () =>
        localStorage.getItem("token"),
      );

      const query = api.get<User[]>("/users/");

      const user = query.find(
        (u) => u.username === data.username && u.password === data.password,
      );
      return user ?? null;
    } catch (err) {
      console.log(err);
      return null;
    }
  }
}
