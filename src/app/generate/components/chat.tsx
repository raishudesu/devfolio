"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sparkle, Sparkles, SquareUserRound } from "lucide-react";
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
  Content,
} from "@google/generative-ai";
import { FormEvent, useState } from "react";
import StartingDisplay from "./starting-display";
import { toast } from "sonner";

const Chat = () => {
  const [prompt, setPrompt] = useState<string>("");
  const [chatHistory, setChatHistory] = useState<Content[]>([]);
  const [loading, setLoading] = useState(false);

  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey as string);

  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-pro",
    systemInstruction:
      "You are a Generative AI for Devfolio platform. You will help prompters as developers to generate and brainstorm ideas to increase their development skills and employment probability.",
  });

  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };

  const chatSession = model.startChat({
    generationConfig,
    // safetySettings: Adjust safety settings
    // See https://ai.google.dev/gemini-api/docs/safety-settings
    history: chatHistory,
  });
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

      // Now you can display chatHistory on your frontend
      // console.log(chatHistory); // For demonstration purposes
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
    <div className="mt-6 w-full h-full flex flex-col gap-4 ">
      {chatHistory.length === 0 ? <StartingDisplay /> : null}
      <div className="h-full flex flex-col justify-between">
        {chatHistory.length === 0 ? (
          <div className="h-full max-h-[75vh]"></div>
        ) : (
          <div className="h-full max-h-[75vh] overflow-y-scroll">
            <div className="py-6 w-full grid gap-6 ">
              {chatHistory.map((message, index) => (
                <div key={index} className="flex gap-2 rounded-lg border p-6">
                  <div>
                    {message.role === "user" ? (
                      <SquareUserRound size={20} color="#6C63FF" />
                    ) : (
                      <Sparkles size={20} color="#6C63FF" />
                    )}
                  </div>
                  <div className="text-muted-foreground">
                    {message.parts[0].text}
                  </div>
                </div>
              ))}
              <div className="px-6">
                {loading ? (
                  <Sparkle size={20} className="animate-spin" color="#6C63FF" />
                ) : null}
              </div>
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
            />
            <Button type="submit" className="p-6 rounded-full">
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
