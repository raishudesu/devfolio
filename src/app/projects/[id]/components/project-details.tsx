import { ProjectResponse } from "@/types/types";
import Image from "next/image";
import MoreProjects from "./more-projects";
import { Button } from "@/components/ui/button";
import { Bookmark, Heart, SquareArrowOutUpRight } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { textAnimation } from "@/components/landing-page/hero";
import LikeButton from "../../components/like-button";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import ProfileBtn from "./profile-btn";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const getProject = async (projectId: string): Promise<ProjectResponse> => {
  const data = await fetch(`${apiUrl}/api/project/${projectId}`, {
    cache: "no-store",
  });
  return await data.json();
};

const ProjectDetails = async ({ projectId }: { projectId: string }) => {
  const session = await getServerSession(authOptions);
  const data = await getProject(projectId);
  const { project } = data;
  return (
    <section className="my-6 w-full max-w-screen-xl">
      <div className="w-full">
        <div className="z-10 sticky top-0 flex items-center gap-2 py-3 bg-primary-foreground">
          <div className="flex flex-col w-full md:flex-row justify-between gap-4">
            <div className="flex gap-2">
              <Avatar>
                <AvatarImage
                  src={project.user.imageLink}
                  alt={`${project.user.username}-profile-image`}
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="w-full flex justify-between items-center">
                <div className="flex flex-col">
                  <Link
                    href={`/${project.user.username}`}
                    className={`hover:underline font-medium ${textAnimation}`}
                  >
                    {project.user.firstName} {project.user.lastName}
                  </Link>
                  <div className="mt-2 flex gap-2 items-center">
                    {project.user.isAvailableForWork ? (
                      <>
                        <div className="w-2 h-2 bg-green-400 animate-pulse rounded-full"></div>
                        <small className="text-xs font-medium leading-none text-muted-foreground">
                          Available for work 🚀{" "}
                        </small>
                      </>
                    ) : (
                      <>
                        <div className="w-2 h-2 bg-red-400 animate-pulse rounded-full"></div>
                        <small className="text-xsm text-muted-foreground">
                          Unavailable for work{" "}
                        </small>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <ProfileBtn username={project.user.username} />
              <LikeButton
                projectId={project.id}
                userId={project.user.id}
                initialLikes={project.likes.length}
                isLiked={project.likes.some(
                  (like) => like.userId === session?.user?.id
                )}
                onProject
              />
            </div>
          </div>
        </div>
        <h1
          className={`mt-2 scroll-m-20 pb-2 text-3xl font-bold tracking-tight first:mt-0 ${textAnimation}`}
        >
          {project.projectName}
        </h1>
        <div className="mt-2 flex gap-2">
          {project.tags.map((tag, index) => (
            <Badge variant={"secondary"} key={index}>
              {tag}
            </Badge>
          ))}
        </div>
        <div className="py-6 grid gap-6">
          {project.images.map(({ id, url }) => (
            <AspectRatio ratio={16 / 9} key={id}>
              <Image
                src={url}
                alt={url}
                fill
                className="rounded-md object-cover border"
              />
            </AspectRatio>
          ))}

          <p className="leading-7 [&:not(:first-child)]:mt-6 text-lg">
            {project.description}
          </p>
        </div>
        <div className="flex gap-6">
          {project.githubUrl && (
            <Link
              href={project.githubUrl as string}
              target="_blank"
              className="flex gap-2 items-center"
            >
              <div
                className={`hover:underline font-medium text-lg ${textAnimation}`}
              >
                Github
              </div>
              <SquareArrowOutUpRight size={15} />
            </Link>
          )}
          {project.demoUrl && (
            <Link
              href={project.demoUrl as string}
              target="_blank"
              className="flex gap-2 items-center"
            >
              <div
                className={`hover:underline font-medium text-lg ${textAnimation}`}
              >
                Demo
              </div>
              <SquareArrowOutUpRight size={15} />
            </Link>
          )}
        </div>
      </div>
      <Separator />
      <h2
        className={`my-6 scroll-m-20 text-xl font-bold tracking-tight ${textAnimation}`}
      >
        More projects by {project.user.firstName}
      </h2>
      <MoreProjects projectId={project.id} username={project.user.username} />
    </section>
  );
};

export default ProjectDetails;
