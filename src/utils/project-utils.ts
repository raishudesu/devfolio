import { ProjectResponse, ProjectsResponse } from "@/types/types";

export const getProjectsUtil = async (): Promise<ProjectsResponse> => {
  try {
    const res = (await fetch("/api/project")) as ProjectsResponse;

    const data = (await res.json()) as ProjectsResponse;

    return data;
  } catch (error: any) {
    throw error;
  }
};

export const getProjectUtil = async (id: string): Promise<ProjectResponse> => {
  try {
    const res = (await fetch(`/api/project/${id}`)) as ProjectResponse;
    const data = (await res.json()) as ProjectResponse;

    return data;
  } catch (error: any) {
    throw error;
  }
};

export const getProjectsByUserUtil = async (
  userId: string
): Promise<ProjectsResponse> => {
  try {
    const res = (await fetch(
      `/api/user/${userId}/projects`
    )) as ProjectsResponse;

    const data = (await res.json()) as ProjectsResponse;

    return data;
  } catch (error) {
    throw error;
  }
};
