import Chat from "../components/chat";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { notFound } from "next/navigation";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const getGeminiConversation = async (
  userId: string,
  conversationId: string
) => {
  try {
    const res = await fetch(
      `${apiUrl}/api/ai/user/${userId}/generation/${conversationId}`
    );

    return await res.json();
  } catch (error) {
    console.error(error);
    return error;
  }
};

const ConversationPage = async ({
  params,
}: {
  params: { conversationId: string };
}) => {
  const session = await getServerSession(authOptions);

  const contentHistory = await getGeminiConversation(
    session?.user.id as string,
    params.conversationId as string
  );

  if (!contentHistory.content) return notFound();

  const content = JSON.parse(contentHistory.content.content);

  return (
    <Chat
      conversationId={params.conversationId as string}
      contentHistory={content}
    />
  );
};

export default ConversationPage;
