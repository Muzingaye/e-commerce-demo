import type { User } from "../models/User";
import { API_URL } from "../config";

export class ApiUser {
  base_url: string | null = "";
  constructor(base_url?: string) {
    this.base_url = base_url ?? API_URL;
  }

  async login(data: User): Promise<User> {
    try {
      console.log(base_url);
      console.log(`${data.username} {data.email} {data.password}`);
      const resp = await fetch(`${this.base_url}/users/`);

      const user = resp.filter((u) => username == data.usern))
    } catch (err) {
      console.log(err);
    }
  }
}
