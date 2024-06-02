import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import rocket from "../assets/images/landing-page/rocket.svg";

const Hero = () => {
  return (
    <>
      <div className="flex flex-col items-center text-center gap-12">
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight lg:text-5xl">
          Ideate. Develop. Inspire. Get hired. 🚀
        </h1>

        <div className="w-full flex gap-2 flex-col justify-center sm:flex-row">
          <Button className="rounded-full p-6">Upload Project</Button>
          <Button variant={"secondary"} className="rounded-full p-6">
            Generate Ideas
          </Button>
        </div>
        <Image src={rocket} alt="rocket" className="w-full max-w-lg" />
      </div>
    </>
  );
};

export default Hero;
