import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { ProjectCard } from "@/types/types";
import { Eye, Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const ProjectCard = ({ projectId, user, url, tags }: ProjectCard) => {
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
      <div className="p-2 flex gap-2">
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
        <div className="flex items-center gap-2">
          <Button size="sm" variant={"secondary"}>
            <Heart size={15} />
          </Button>
          <small className="text-xs text-muted-foreground">123</small>
          <Button size={"sm"} variant={"secondary"} disabled>
            <Eye size={15} />
          </Button>
          <small className="text-xs text-muted-foreground">123</small>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
