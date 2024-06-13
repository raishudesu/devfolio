"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const CurrentProfileBtns = () => {
  const router = useRouter();
  return (
    <>
      <Button
        className="hover:bg-[#6C63FF] p-6 rounded-full"
        onClick={() => router.push("/uploads/new")}
      >
        Upload project
      </Button>
      <Button
        className="p-6 rounded-full"
        variant={"secondary"}
        onClick={() => router.push("/settings/profile")}
      >
        Edit profile
      </Button>
    </>
  );
};

export default CurrentProfileBtns;
