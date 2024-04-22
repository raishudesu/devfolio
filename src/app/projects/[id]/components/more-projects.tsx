import { ProjectsResponse } from "@/types/types";
import ProjectCard from "../../components/project-card";

const getMoreProjects = async (username: string): Promise<ProjectsResponse> => {
  const data = await fetch(
    `http://localhost:3000/api/user/${username}/projects`
  );

  return await data.json();
};

const MoreProjects = async ({
  projectId,
  username,
}: {
  projectId: string;
  username: string;
}) => {
  const data = await getMoreProjects(username);

  const moreProjects = data?.projects.filter(
    (project) => project.id !== projectId
  );

  return (
    <div className="w-full columns-1 md:columns-2 gap-4">
      {moreProjects?.map(({ id, projectName, images, user }) => (
        <ProjectCard
          projectName={projectName}
          user={user}
          url={images[0].url}
          key={id}
        />
      ))}
    </div>
  );
};

export default MoreProjects;
