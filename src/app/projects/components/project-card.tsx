import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { ProjectCard } from "@/types/types";
import Image from "next/image";

const ProjectCard = ({ projectName, description, url, user }: ProjectCard) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{projectName}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Image src={url} alt={url} width={150} height={150} />
      </CardContent>
      <CardFooter>
        {user.firstName} {user.lastName}
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;
