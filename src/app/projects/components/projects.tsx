import ProjectCard from "./project-card";
import { ProjectsResponse } from "@/types/types";

const getProjects = async (): Promise<ProjectsResponse> => {
  const data = await fetch("http://localhost:3000/api/project");
  return await data.json();
};

const Projects = async () => {
  const data = await getProjects();

  return (
    <section className="my-6">
      <h1 className="scroll-m-20 pb-6 text-3xl font-semibold tracking-tight first:mt-0">
        Projects
      </h1>
      <div className="w-full grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {data?.projects?.map(
          ({ id, userId, user, projectName, description, images }) => (
            <>
              {images ? (
                <ProjectCard
                  projectId={id}
                  projectName={projectName}
                  url={images[0].url}
                  user={user}
                  key={id}
                />
              ) : null}
            </>
          )
        )}
      </div>
    </section>
  );
};

export default Projects;
