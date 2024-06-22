import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import { textAnimation } from "./hero";
import { ExternalLink } from "lucide-react";

type FeatureCard = {
  title: string;
  desc: string;
};

const FeatureCard = ({ title, desc }: FeatureCard) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className={`${textAnimation} font-bold`}>{title}</CardTitle>
        <CardDescription>{desc}</CardDescription>
      </CardHeader>

      <CardFooter>
        <ExternalLink size={20} className="text-muted-foreground" />
      </CardFooter>
    </Card>
  );
};

export default FeatureCard;
