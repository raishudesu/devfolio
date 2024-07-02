import ProjectCard from "./project-card";
import { ProjectsResponse } from "@/types/types";
import { textAnimation } from "@/components/landing-page/hero";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const getProjects = async (): Promise<ProjectsResponse> => {
  const data = await fetch(`${apiUrl}/api/project`, {
    cache: "no-store",
  });
  return await data.json();
};

const Projects = async () => {
  const data = await getProjects();

  const session = await getServerSession(authOptions);

  const currentUser = session?.user;

  return (
    <section className="w-full my-6">
      <div className="pb-6 flex items-center justify-between">
        <h1
          className={`scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0 ${textAnimation}`}
        >
          Projects
        </h1>
      </div>
      <div className="w-full grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data?.projects?.map(
          ({ id, user, projectName, images, tags, likes }) => (
            <div key={id}>
              {images ? (
                <ProjectCard
                  projectId={id}
                  projectName={projectName}
                  url={images[0].url}
                  user={user}
                  tags={tags}
                  key={id}
                  initialLikes={likes.length}
                  isLiked={likes.some(
                    (like) => like.userId === currentUser?.id
                  )}
                />
              ) : null}
            </div>
          )
        )}
      </div>
    </section>
  );
};

export default Projects;
