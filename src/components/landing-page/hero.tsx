import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import rocket from "../../assets/images/landing-page/rocket.svg";
import { Syne } from "next/font/google";
import TypeAnimated from "./type-animated";

const syne = Syne({ subsets: ["latin"] });
export const textAnimation = `animate-text bg-gradient-to-r from-[#03fcdb] via-purple-500 to-orange-500 bg-clip-text font-black text-transparent ${syne.className}`;

const Hero = () => {
  return (
    <div className="flex flex-col items-center text-center gap-12">
      <div className="flex flex-col gap-2">
        <h1 className={`${textAnimation} font-bold text-4xl md:text-5xl `}>
          Your Platform to
        </h1>
        <TypeAnimated />
      </div>

      <div className="w-full flex gap-2 flex-col justify-center sm:flex-row">
        <Button className="rounded-full p-6">Upload Project</Button>
        <Button variant={"secondary"} className="rounded-full p-6">
          Generate Ideas
        </Button>
      </div>
      <Image src={rocket} alt="rocket" className="w-full max-w-lg" />
    </div>
  );
};

export default Hero;
