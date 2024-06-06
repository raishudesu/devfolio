"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sparkle, Sparkles, SquareUserRound } from "lucide-react";
import { Content } from "@google/generative-ai";
import { FormEvent, useEffect, useRef, useState } from "react";
import StartingDisplay from "./starting-display";
import { toast } from "sonner";
import Prompt from "./prompt";
import { genAIModel, generationConfig } from "@/lib/gemini";

const Chat = () => {
  const [prompt, setPrompt] = useState<string>("");
  const [chatHistory, setChatHistory] = useState<Content[]>([]);
  const [loading, setLoading] = useState(false);
  const conversationRef = useRef<HTMLDivElement>(null);

  const chatSession = genAIModel.startChat({
    generationConfig,
    // safetySettings: Adjust safety settings
    // See https://ai.google.dev/gemini-api/docs/safety-settings
    history: chatHistory,
  });

  useEffect(() => {
    if (conversationRef.current) {
      conversationRef.current.scrollTop = conversationRef.current.scrollHeight;
    }
  }, [loading]);

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
    <div className="mt-3 w-full h-full flex flex-col gap-4 ">
      {chatHistory.length === 0 ? <StartingDisplay /> : null}
      <div className="w-full h-full flex flex-col justify-between">
        {chatHistory.length === 0 ? (
          <div className="h-full max-h-[75vh]"></div>
        ) : (
          <div
            ref={conversationRef}
            className="w-full h-full max-h-[75vh] overflow-y-scroll no-scrollbar"
          >
            <div className="py-6 w-full flex flex-col gap-6">
              {chatHistory.map((message, index) => (
                <div
                  key={index}
                  className="w-full flex gap-2 rounded-lg border p-6 overflow-hidden"
                >
                  <div>
                    {message.role === "user" ? (
                      <SquareUserRound size={20} color="#6C63FF" />
                    ) : (
                      <Sparkles size={20} color="#6C63FF" />
                    )}
                  </div>
                  <div className="w-full pr-2">
                    <Prompt response={message.parts[0].text} />
                  </div>
                </div>
              ))}
              {loading ? (
                <div className="px-6">
                  <Sparkle size={20} className="animate-spin" color="#6C63FF" />
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
              type="submit"
              className="p-6 rounded-full"
              disabled={loading}
            >
              <Sparkles size={20} />
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
