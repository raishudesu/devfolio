"use client";

import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import React, { useState } from "react";

const LikeButton = ({
  userId,
  projectId,
  initialLikes,
  isLiked,
  onProject,
}: {
  userId: string;
  projectId: string;
  initialLikes: number;
  isLiked: boolean;
  onProject?: boolean;
}) => {
  const [likes, setLikes] = useState(initialLikes);
  const [liked, setLiked] = useState(isLiked);
  const session = useSession();
  const router = useRouter();

  const handleLike = async () => {
    if (session.status === "unauthenticated") {
      router.replace("/sign-in");
      return;
    }
    try {
      const response = liked
        ? await fetch(`/api/project/${projectId}/user/${userId}/likes`, {
            method: "DELETE",
          })
        : await fetch(`/api/project/${projectId}/user/${userId}/likes`, {
            method: "POST",
          });

      if (response.ok) {
        setLikes(liked ? likes - 1 : likes + 1);
        setLiked(!liked);
      } else {
        console.error("Failed to like/unlike project");
      }
    } catch (error) {
      console.error("Error liking/unliking project", error);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        size="sm"
        variant="secondary"
        onClick={handleLike}
        className={`${liked ? "bg-red-200" : ""} ${
          onProject ? "p-6 rounded-full" : ""
        }`}
      >
        <Heart
          size={onProject ? 20 : 15}
          className={liked ? "text-red-500" : ""}
        />
      </Button>
      <small className="text-xs text-muted-foreground">{likes}</small>
    </div>
  );
};

export default LikeButton;
