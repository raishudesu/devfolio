"use client";

import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import React, { useState } from "react";

const LikeButton = ({
  userId,
  projectId,
  initialLikes,
  isLiked,
}: {
  userId: string;
  projectId: string;
  initialLikes: number;
  isLiked: boolean;
}) => {
  const [likes, setLikes] = useState(initialLikes);
  const [liked, setLiked] = useState(isLiked);

  const handleLike = async () => {
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
        className={liked ? "bg-red-200" : ""}
      >
        <Heart size={15} className={liked ? "text-red-500" : ""} />
      </Button>
      <small className="text-xs text-muted-foreground">{likes}</small>
    </div>
  );
};

export default LikeButton;
