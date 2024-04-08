import prisma from "@/lib/db";
import { projectSchema } from "@/lib/zod";
import { ProjectNotFoundError, UserHasProjectError } from "@/utils/errors";
import type { Project } from "@prisma/client";
import { z } from "zod";

export const createProject = async (data: z.infer<typeof projectSchema>) => {
  try {
    const project = await prisma.project.create({
      data,
    });

    return project;
  } catch (error) {
    throw error;
  }
};

export const getProject = async (id: string) => {
  try {
    const project = await prisma.project.findUnique({
      where: {
        id,
      },
      include: {
        images: true,
      },
    });

    if (!project) {
      throw new ProjectNotFoundError(
        false,
        `Project with ID: ${id} does not exist`,
        404
      );
    }

    return project;
  } catch (error) {
    throw error;
  }
};

export const getProjects = async () => {
  try {
    const projects = await prisma.project.findMany({
      include: {
        images: true,
      },
    });

    return projects;
  } catch (error) {
    throw error;
  }
};

export const updateProject = async (id: string, data: object | Project) => {
  try {
    await getProject(id);

    await prisma.project.update({
      where: {
        id,
      },
      data,
    });

    return;
  } catch (error) {
    throw error;
  }
};

export const deleteProject = async (id: string) => {
  try {
    await getProject(id);

    await prisma.project.delete({
      where: {
        id,
      },
    });

    return;
  } catch (error) {
    throw error;
  }
};
