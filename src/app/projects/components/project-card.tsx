import type { ProjectCard } from "@/types/types";
import Image from "next/image";

const ProjectCard = ({ url }: ProjectCard) => {
  return (
    <div className="flex flex-col mb-6 gap-2">
      <Image
        className="w-full rounded-xl"
        src={url}
        alt={url}
        width={150}
        height={150}
      />
    </div>
  );
};

export default ProjectCard;
