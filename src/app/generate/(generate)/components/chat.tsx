"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Content } from "@google/generative-ai";
import { FormEvent, useEffect, useRef, useState } from "react";
import StartingDisplay from "./starting-display";
import { toast } from "sonner";
import Prompt from "./prompt";
import { genAIModel, generationConfig } from "@/lib/gemini";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { z } from "zod";
import { geminiConversationSchema } from "@/lib/zod";
import type { GeminiConversation } from "@prisma/client";
import { textAnimation } from "@/components/landing-page/hero";

type TChat = {
  conversationId?: string;
  contentHistory?: Content[];
};

type GeminiFetchResponse = z.infer<typeof geminiConversationSchema> & {
  ok: boolean;
  content: GeminiConversation;
};

const Chat = ({ conversationId, contentHistory }: TChat) => {
  const [prompt, setPrompt] = useState<string>("");
  const [chatHistory, setChatHistory] = useState<Content[]>(() =>
    contentHistory ? contentHistory : []
  );
  const [loading, setLoading] = useState(false);
  const conversationRef = useRef<HTMLDivElement>(null);
  const session = useSession();
  const pathname = usePathname();
  const router = useRouter();

  const chatSession = genAIModel.startChat({
    generationConfig,
    history: contentHistory ? contentHistory : chatHistory,
  });

  const createConversation = async (
    userId: string | undefined,
    conversation: string
  ): Promise<GeminiFetchResponse | undefined> => {
    if (!userId) return;
    try {
      const res = await fetch(`/api/ai/user/${userId}/generation/save`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: conversation }),
      });

      if (!res.ok) {
        throw new Error("Failed to save conversation");
      }
      return await res.json();
    } catch (error: any) {
      console.error(error);
      return error;
    }
  };

  const updateConversation = async (
    userId: string | undefined,
    content: string
  ) => {
    if (!conversationId) return;

    try {
      const res = await fetch(
        `/api/ai/user/${userId}/generation/${conversationId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ content }),
        }
      );

      return res;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (conversationRef.current) {
      conversationRef.current.scrollTop = conversationRef.current.scrollHeight;
    }
  }, [loading]);

  useEffect(() => {
    const handleRouteChange = async () => {
      if (chatHistory.length > 0 && pathname === "/generate/new") {
        await createConversation(
          session.data?.user.id,
          JSON.stringify(chatHistory)
        );
        return;
      }

      await updateConversation(
        session.data?.user.id,
        JSON.stringify(chatHistory)
      );
    };

    return () => {
      handleRouteChange();
    };
  }, [pathname]);

  useEffect(() => {
    const handleBeforeUnload = async (event: BeforeUnloadEvent) => {
      event.preventDefault();
      if (chatHistory.length > 0) {
        await updateConversation(
          session.data?.user.id,
          JSON.stringify(chatHistory)
        );
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [chatHistory, session.data?.user.id]);

  const onPrompt = async (e: FormEvent) => {
    e.preventDefault();

    setPrompt("");
    setLoading(true);

    try {
      setChatHistory((prevHistory) => [
        ...prevHistory,
        { role: "user", parts: [{ text: prompt }] }, // User prompt with parts as an array of prompt text
      ]);

      const result = await chatSession.sendMessage(prompt);

      if (result) {
        setLoading(false);
        setChatHistory((prevHistory) => [
          ...prevHistory,
          { role: "model", parts: [{ text: result.response.text() }] }, // Gemini response with parts as an array of response text
        ]);
      }

      if (!conversationId) {
        const conversation = await createConversation(
          session.data?.user.id,
          JSON.stringify(chatHistory)
        );

        if (conversation?.ok) {
          router.push(`/generate/${conversation.content.id}`);
          router.refresh();
        }
      }
    } catch (error) {
      setLoading(false);
      toast("Something went wrong ❌", {
        description: "Prompt failed. Please try again.",
        style: {
          color: "red",
        },
      });
      console.error(error);
    }
  };

  return (
    <div className="pt-4 w-full h-full flex flex-col gap-4 ">
      {chatHistory.length === 0 ? <StartingDisplay /> : null}
      <div className="w-full h-full flex flex-col justify-between">
        {chatHistory.length === 0 ? (
          <div className="h-full max-h-[75vh]"></div>
        ) : (
          <div
            ref={conversationRef}
            className="w-full h-full max-h-[75vh] overflow-y-scroll no-scrollbar"
          >
            <div className="py-6 w-full flex flex-col gap-3">
              {chatHistory.map((message, index) => (
                <div
                  key={index}
                  className="w-full flex gap-2 rounded-lg border p-6 overflow-hidden"
                >
                  <div>
                    {message.role === "user" ? (
                      // <SquareUserRound size={20} color="#6C63FF" />
                      <div className={`${textAnimation}`}>👨</div>
                    ) : (
                      <div className={`${textAnimation} text-lg`}>✨</div>
                    )}
                  </div>
                  <div className="w-full pr-2">
                    <Prompt response={message.parts[0].text} />
                  </div>
                </div>
              ))}
              {loading ? (
                <div className="px-6">
                  {/* <Sparkle size={20} className="animate-spin" color="#6C63FF" /> */}
                  <div className={`${textAnimation} text-lg`}>✨</div>
                </div>
              ) : null}
            </div>
          </div>
        )}
        <div className="flex gap-2">
          <form className="w-full flex gap-2" onSubmit={onPrompt}>
            <Input
              className="p-6 rounded-full"
              placeholder="Enter your prompt."
              onChange={(e) => setPrompt(e.target.value)}
              value={prompt}
              disabled={loading}
            />
            <Button
              variant={"outline"}
              type="submit"
              className="p-6 rounded-full"
              disabled={loading || prompt === ""}
            >
              <div className={`${textAnimation} font-bold text-lg`}>✨</div>
            </Button>
          </form>
        </div>
      </div>
      <div className="text-center">
        <small className="text-xsm font-medium leading-none text-muted-foreground">
          Built with Google Gemini API ✨
        </small>
      </div>
    </div>
  );
};

export default Chat;
