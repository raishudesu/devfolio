import prisma from "@/lib/db";
import { geminiConversationSchema } from "@/lib/zod";
import { UserNotFoundError } from "@/utils/errors";
import { z } from "zod";

export const createGeminiConversation = async (
  userId: string,
  { content }: z.infer<typeof geminiConversationSchema>
) => {
  try {
    const conversation = await prisma.geminiConversation.create({
      data: {
        userId,
        content,
      },
    });

    return conversation;
  } catch (error) {
    throw error;
  }
};

export const updateGeminiConversation = async (
  conversationId: string,
  { content }: z.infer<typeof geminiConversationSchema>
) => {
  try {
    await prisma.geminiConversation.update({
      where: {
        id: conversationId,
      },
      data: {
        content,
      },
    });
  } catch (error) {
    throw error;
  }
};

export const getGeminiConversations = async (userId: string) => {
  try {
    const isUserExists = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!isUserExists)
      throw new UserNotFoundError(false, "User not found", 404);

    const conversations = await prisma.geminiConversation.findMany({
      where: {
        userId,
      },
      orderBy: {
        updatedAt: "desc",
      },
    });

    return conversations;
  } catch (error) {
    throw error;
  }
};

export const getGeminiConversation = async (
  userId: string,
  conversationId: string
) => {
  try {
    const conversation = await prisma.geminiConversation.findUnique({
      where: {
        id: conversationId,
        userId,
      },
    });

    return conversation;
  } catch (error) {
    throw error;
  }
};

export const deleteGeminiConversation = async (conversationId: string) => {
  await prisma.geminiConversation.delete({
    where: {
      id: conversationId,
    },
  });

  return;
};
