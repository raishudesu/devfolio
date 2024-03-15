import { Button } from "@/components/ui/button";
import React from "react";

const Hero = () => {
  return (
    <>
      <div className="flex flex-col text-center gap-4">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Share. Inspire. Get hired.
        </h1>
        <p>
          Devfolio is about developers sharing their portfolio as design
          inspiration and increase their employment probability.
        </p>
        <Button className="sm:self-center">Get started</Button>
      </div>
    </>
  );
};

export default Hero;
