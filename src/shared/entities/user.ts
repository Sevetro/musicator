export interface User {
  username: string;
  email: string;
  password: string;
}

export type RegisterUserData = Pick<User, "username" | "email" | "password">;
