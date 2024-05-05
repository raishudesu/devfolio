"use client";

import { Button } from "@/components/ui/button";
import { Ellipsis } from "lucide-react";
import { useRouter } from "next/navigation";

const CurrentProfileBtns = () => {
  const router = useRouter();
  return (
    <>
      <Button onClick={() => router.push("/uploads/new")}>
        Upload project
      </Button>
      <Button
        variant={"secondary"}
        onClick={() => router.push("/account/profile")}
      >
        Edit profile
      </Button>
      <Button variant={"secondary"} className="px-3 rounded-full">
        <Ellipsis size={20} />
      </Button>
    </>
  );
};

export default CurrentProfileBtns;
