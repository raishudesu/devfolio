import Chat from "../components/chat";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const getGeminiConversation = async (
  userId: string,
  conversationId: string
) => {
  try {
    const res = await fetch(
      `http:localhost:3000/api/ai/user/${userId}/generation/${conversationId}`
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

  const content = JSON.parse(contentHistory.content.content);

  return (
    <Chat
      conversationId={params.conversationId as string}
      contentHistory={content}
    />
  );
};

export default ConversationPage;
