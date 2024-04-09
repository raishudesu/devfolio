import prisma from "@/lib/db";
import { imageObjectSchema, uploadImagesSchema } from "@/lib/zod";
import { z } from "zod";
import { getProject } from "./project.service";

export const getImagesByProject = async (projectId: string) => {
  try {
    const images = prisma.image.findMany({
      where: {
        projectId,
      },
    });

    return images;
  } catch (error) {
    throw error;
  }
};

export const addProjectImages = async (
  imageArray: z.infer<typeof uploadImagesSchema>
) => {
  try {
    await getProject(imageArray[0].projectId);

    const images = prisma.image.createMany({
      data: imageArray,
    });

    return images;
  } catch (error) {
    throw error;
  }
};

export const updateImage = async (
  id: string,
  data: z.infer<typeof imageObjectSchema>
) => {
  try {
    const image = prisma.image.update({
      where: {
        id,
      },
      data,
    });

    return image;
  } catch (error) {
    throw error;
  }
};

export const deleteImage = async (id: string, projectId: string) => {
  try {
    await prisma.image.delete({
      where: {
        id,
        projectId,
      },
    });
    return;
  } catch (error) {
    throw error;
  }
};
