import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import type { ProjectCard } from "@/types/types";
import { Eye, Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const ProjectCard = ({ projectId, user, url }: ProjectCard) => {
  return (
    <Link
      href={`/projects/${projectId}`}
      className="w-full flex flex-col gap-2 cursor-pointer"
    >
      <AspectRatio ratio={16 / 9}>
        <Image src={url} alt={url} fill className="rounded-md object-cover" />
      </AspectRatio>
      <div className="flex justify-between items-center gap-2">
        <div className="flex gap-2 items-center">
          <div className="w-6 h-6 rounded-full bg-slate-400"></div>
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
    </Link>
  );
};

export default ProjectCard;
