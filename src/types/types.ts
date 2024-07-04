import type { User, Project, Image, ProjectLike } from "@prisma/client";

type IncludeUser = {
  username: string;
  firstName: string;
  lastName: string;
  imageLink: string;
  id: string;
  isAvailableForWork: boolean;
};

export type ProjectCard = {
  projectId: string;
  projectName: string;
  user: IncludeUser;
  url: string;
  tags: string[];
  initialLikes: number;
  isLiked: boolean;
};

export type ProjectType = Project & {
  images: Image[];
  user: IncludeUser;
  likes: ProjectLike[];
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
  error?: any;
};

export type TopUsersResponse = Response & {
  ok: boolean;
  users: {
    username: string;
    firstName: string;
    lastName: string;
    imageLink: string;
    id: string;
    isAvailableForWork: boolean;
    totalLikes: number;
  }[];
  error?: any;
};

export type TopUserCard = {
  username: string;
  firstName: string;
  lastName: string;
  imageLink: string;
  id?: string;
  isAvailableForWork: boolean;
  totalLikes: number;
};
