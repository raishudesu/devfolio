import prisma from "@/lib/db";
import { geminiConversationSchema } from "@/lib/zod";
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
    const conversations = await prisma.geminiConversation.findMany({
      where: {
        userId,
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
