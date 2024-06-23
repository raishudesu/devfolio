import { textAnimation } from "@/components/landing-page/hero";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

const StartingDisplay = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className={`${textAnimation} font-bold`}>
          Devfolio Generative AI ✨
        </CardTitle>
      </CardHeader>
      <CardContent className="light:text-zinc-900">
        <p className="leading-7 [&:not(:first-child)]:mt-6">
          Enter your prompt to start conversing with the AI.
        </p>
      </CardContent>
    </Card>
  );
};

export default StartingDisplay;
