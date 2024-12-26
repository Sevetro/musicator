export interface User {
  name: string;
  email: string;
  password: string;
}

export type RegisterUserData = Pick<User, "name" | "email" | "password">;
