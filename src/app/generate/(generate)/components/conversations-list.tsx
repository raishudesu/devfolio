import { textAnimation } from "@/components/landing-page/hero";
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
    <aside className="h-full max-h-[75vh] w-full md:max-w-60 no-scrollbar overflow-hidden overflow-y-scroll">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
        <h2
          className={`scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0 ${textAnimation}`}
        >
          History
        </h2>
        <Link
          href={"/generate/new"}
          type="button"
          className="p-3 rounded-lg text-sm bg-secondary"
        >
          <SquarePen size={18} />
        </Link>
      </div>

      <div className="mt-6 flex flex-col gap-1">
        {res.content.length === 0 ? (
          <small className="text-sm font-medium leading-none">
            No conversations yet.
          </small>
        ) : null}
        {res.content.map(({ id, content }: { id: string; content: string }) => (
          <Link
            href={`/generate/${id}`}
            key={id}
            className="text-sm text-muted-foreground bg-card w-full border rounded-md py-4 px-6 text-clip overflow-hidden hover:border-primary ease-in-out transition"
          >
            {JSON.parse(content)[0].parts[0].text}
          </Link>
        ))}
      </div>
    </aside>
  );
};

export default ConversationList;
