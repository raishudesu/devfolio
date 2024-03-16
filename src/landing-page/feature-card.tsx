import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";

type FeatureCard = {
  title: string;
  image: string;
  desc: string;
};

const FeatureCard = ({ title, image, desc }: FeatureCard) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{desc}</CardDescription>
      </CardHeader>
      <CardContent></CardContent>
    </Card>
  );
};

export default FeatureCard;
