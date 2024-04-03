import type { User, Portfolio } from "@prisma/client";

export type RegisterResponse = {
  ok: boolean;
  user: User;
  message: string;
  errorMessage: string;
};

export type PortfolioResponse = Response & {
  ok: boolean;
  portfolios: Portfolio[];
};

export type UserResponse = Response & {
  ok: boolean;
  user: User;
};
