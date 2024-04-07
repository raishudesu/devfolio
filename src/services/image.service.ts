import prisma from "@/lib/db";
import { imageSchema } from "@/lib/zod";
import { z } from "zod";

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
  imageArray: z.infer<typeof imageSchema>
) => {
  try {
    const images = prisma.image.createMany({
      data: imageArray,
    });

    return images;
  } catch (error) {
    throw error;
  }
};
