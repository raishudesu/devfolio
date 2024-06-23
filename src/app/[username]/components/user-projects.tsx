import ProjectCard from "@/app/projects/components/project-card";
import { ProjectsResponse } from "@/types/types";
import AddProjectCard from "./add-project-card";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { textAnimation } from "@/components/landing-page/hero";

const getUserProjects = async (username: string): Promise<ProjectsResponse> => {
  const res = await fetch(
    `http://localhost:3000/api/user/${username}/projects`,
    {
      cache: "no-store",
    }
  );
  return await res.json();
};

const UserProjects = async ({ username }: { username: string }) => {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  const data = await getUserProjects(username);

  const { projects } = data;

  return (
    <section className="w-full max-w-screen-xl">
      <div className=" p-4">
        <h2
          className={`scroll-m-20 pb-4 text-2xl font-semibold tracking-tight first:mt-0 ${textAnimation}`}
        >
          Featured Projects
        </h2>
        <div className="w-full grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.length > 0 ? (
            projects?.map(({ id, projectName, images, user, tags }) => (
              <ProjectCard
                projectId={id}
                projectName={projectName}
                user={user}
                url={images[0].url}
                tags={tags}
                key={id}
              />
            ))
          ) : (
            <>
              {user?.username === username ? (
                <AddProjectCard />
              ) : (
                <small className="text-sm font-medium leading-none">
                  @{username} has not posted yet.
                </small>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default UserProjects;
