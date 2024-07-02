"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const ProfileBtn = ({ username }: { username: string }) => {
  const router = useRouter();

  return (
    <Button
      className="p-6 rounded-full"
      onClick={() => router.push(`/${username}`)}
    >
      View profile
    </Button>
  );
};

export default ProfileBtn;
