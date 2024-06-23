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
import Link from "next/link";

type FeatureCard = {
  title: string;
  desc: string;
  link: string;
};

const FeatureCard = ({ title, desc, link }: FeatureCard) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className={`${textAnimation} font-bold`}>{title}</CardTitle>
        <CardDescription>{desc}</CardDescription>
      </CardHeader>

      <CardFooter>
        <Link href={link}>
          <ExternalLink size={20} className="text-muted-foreground" />
        </Link>
      </CardFooter>
    </Card>
  );
};

export default FeatureCard;
