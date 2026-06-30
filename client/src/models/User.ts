export interface User {
  id: number;
  username: string;
  emailAddress: string | null;
  password: string;
  role: "user" | "admin";
}
