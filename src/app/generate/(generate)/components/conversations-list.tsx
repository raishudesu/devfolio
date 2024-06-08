import { authOptions } from "@/lib/auth";
import { SquarePen } from "lucide-react";
import { getServerSession } from "next-auth";
import Link from "next/link";

const getGeminiConversations = async (userId: string) => {
  try {
    const res = await fetch(
      `http://localhost:3000/api/ai/user/${userId}/generation`
    );
    return await res.json();
  } catch (error) {
    console.error(error);
    return error;
  }
};

const ConversationList = async () => {
  const session = await getServerSession(authOptions);
  const res = await getGeminiConversations(session?.user.id as string);

  return (
    <aside className="w-full max-w-80">
      <div className="flex items-center justify-between">
        <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          History
        </h2>
        <Link
          href={"/generate/new"}
          type="button"
          className="p-3 bg-primary rounded-full"
        >
          <SquarePen size={20} />
        </Link>
      </div>

      <div className="mt-6 flex flex-col gap-2">
        {res.content.map(({ id, content }: { id: string; content: string }) => (
          <Link
            href={`/generate/${id}`}
            key={id}
            className="w-full border rounded-md p-6 text-clip overflow-hidden "
          >
            {JSON.parse(content)[0].parts[0].text}
          </Link>
        ))}
      </div>
    </aside>
  );
};

export default ConversationList;
