import ProjectCard from "@/app/projects/components/project-card";
import { ProjectsResponse } from "@/types/types";
import Image from "next/image";

const getUserProjects = async (username: string): Promise<ProjectsResponse> => {
  const res = await fetch(
    `http://localhost:3000/api/user/${username}/projects`
  );
  return await res.json();
};

const UserProjects = async ({ username }: { username: string }) => {
  const data = await getUserProjects(username);

  const { projects } = data;

  return (
    <section className="w-full max-w-screen-2xl">
      <div className=" p-4">
        <h2 className="scroll-m-20 pb-2 text-2xl font-semibold tracking-tight first:mt-0">
          Featured Projects
        </h2>
        <div className="w-full grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects?.map(({ id, projectName, images, user }) => (
            <ProjectCard
              projectId={id}
              projectName={projectName}
              user={user}
              url={images[0].url}
              key={id}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default UserProjects;
