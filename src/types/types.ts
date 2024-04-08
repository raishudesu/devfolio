import type { User, Project, Image } from "@prisma/client";

type ProjectType = Project & {
  images: Image[];
};

export type RegisterResponse = {
  ok: boolean;
  user: User;
  message: string;
  errorMessage: string;
};

export type ProjectsResponse = Response & {
  ok: boolean;
  projects: ProjectType[];
};

export type ProjectResponse = Response & {
  ok: boolean;
  project: ProjectType;
};

export type UserResponse = Response & {
  ok: boolean;
  user: User;
};
