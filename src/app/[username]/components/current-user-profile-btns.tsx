"use client";

import { Button } from "@/components/ui/button";
import { Ellipsis } from "lucide-react";
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
      <Button variant={"secondary"} className="p-6 rounded-full">
        <Ellipsis size={20} />
      </Button>
    </>
  );
};

export default CurrentProfileBtns;
