import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { authOptions } from "@/lib/auth";
import type { ProjectCard } from "@/types/types";
import { Eye, Heart } from "lucide-react";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import DeleteProjectBtn from "./delete-project-btn";
import { textAnimation } from "@/components/landing-page/hero";
import LikeButton from "./like-button";

const ProjectCard = async ({
  projectId,
  user,
  url,
  tags,
  projectName,
  initialLikes,
  isLiked,
}: ProjectCard) => {
  const session = await getServerSession(authOptions);
  const isLoggedInUser = user.username === session?.user.username;

  return (
    <div className="w-full flex flex-col gap-2 border shadow rounded-md hover:shadow-primary transition ease-in-out delay-150">
      <Link href={`/projects/${projectId}`} className="cursor-pointer">
        <AspectRatio ratio={16 / 9}>
          <Image
            src={url}
            alt={url}
            fill
            className="rounded-md object-cover"
            priority
          />
        </AspectRatio>
      </Link>
      <div className="flex justify-between items-center">
        <h2
          className={`px-4 mt-2 scroll-m-20 text-xl font-bold tracking-tight first:mt-0 ${textAnimation}`}
        >
          {projectName}
        </h2>
        {isLoggedInUser ? <DeleteProjectBtn projectId={projectId} /> : null}
      </div>
      <div className="px-2 pb-2 flex gap-2 flex-wrap">
        {tags.map((tag, index) => (
          <Badge variant={"secondary"} key={index}>
            {tag}
          </Badge>
        ))}
      </div>
      <div className="px-2 pb-2 flex justify-between items-center gap-2">
        <div className="flex gap-2 items-center">
          <Avatar>
            <AvatarImage
              src={user?.imageLink}
              alt={`${user?.username}-profile-image`}
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <small>
            {user.firstName} {user.lastName}
          </small>
        </div>
        <LikeButton
          userId={user.id}
          projectId={projectId}
          initialLikes={initialLikes}
          isLiked={isLiked}
        />
      </div>
    </div>
  );
};

export default ProjectCard;
