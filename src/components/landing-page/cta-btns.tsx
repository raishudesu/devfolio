"use client";

import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const CtaBtns = () => {
  const router = useRouter();

  return (
    <>
      <Button
        onClick={() => router.push("/uploads/new")}
        className="rounded-full p-6"
      >
        Upload Project
      </Button>
      <Button
        onClick={() => router.push("/generate/new")}
        variant={"secondary"}
        className="rounded-full p-6"
      >
        Generate Ideas
      </Button>
    </>
  );
};

export default CtaBtns;
