import type { User } from "@prisma/client";

export type RegisterResponse = {
  ok: boolean;
  user: User;
  message: string;
  errorMessage: string;
};
