import { ProjectResponse } from "@/types/types";
import Image from "next/image";
import MoreProjects from "./more-projects";
import { Button } from "@/components/ui/button";
import { Bookmark, Heart } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Link from "next/link";

const getProject = async (projectId: string): Promise<ProjectResponse> => {
  const data = await fetch(`http://localhost:3000/api/project/${projectId}`);
  return await data.json();
};

const ProjectDetails = async ({ projectId }: { projectId: string }) => {
  const data = await getProject(projectId);

  const { project } = data;

  return (
    <section className="my-6 w-full max-w-screen-xl">
      <div className="w-full">
        <h1 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          {project.projectName}
        </h1>
        <div className="z-10 sticky top-0 flex gap-2 py-3 bg-primary-foreground">
          <div className="w-12 h-12 rounded-full bg-slate-400"></div>

          <div className="w-full flex justify-between items-center">
            <div className="flex flex-col gap-2">
              <Link
                href={`/${project.user.username}`}
                className="hover:underline"
              >
                <p>
                  {project.user.firstName} {project.user.lastName}
                </p>
              </Link>
              <div className="flex gap-2 items-center">
                <div className="w-2 h-2 bg-green-400 animate-pulse rounded-full"></div>
                <small>Available for work 🚀 </small>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant={"secondary"}>
                <Heart size={20} />
              </Button>
              <Button variant={"secondary"}>
                <Bookmark size={20} />
              </Button>
              <Button>Contact</Button>
            </div>
          </div>
        </div>
        <div className="py-6 grid gap-6">
          {project.images.map(({ id, url }) => (
            <AspectRatio ratio={16 / 9} key={id}>
              <Image
                src={url}
                alt={url}
                fill
                className="rounded-md object-cover"
              />
            </AspectRatio>
          ))}

          <p className="leading-7 [&:not(:first-child)]:mt-6 text-xl">
            {project.description}
          </p>
        </div>
      </div>
      <Separator />
      <h3 className="my-6 scroll-m-20 text-lg font-semibold tracking-tight">
        More projects by {project.user.firstName}
      </h3>
      <MoreProjects projectId={project.id} username={project.user.username} />
    </section>
  );
};

export default ProjectDetails;
