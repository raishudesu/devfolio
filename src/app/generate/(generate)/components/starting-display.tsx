import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

const StartingDisplay = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Devfolio Generative AI ✨</CardTitle>
      </CardHeader>
      <CardContent className="light:text-zinc-900">
        <p className="leading-7 [&:not(:first-child)]:mt-6">
          Generate project ideas and turn these into helpful and inspiring
          projects.
          <br />
          Devfolio Generative AI uses Gemini API to enhance the generation of
          ideas and help aspiring developers to have their second brain.
        </p>
      </CardContent>
    </Card>
  );
};

export default StartingDisplay;
