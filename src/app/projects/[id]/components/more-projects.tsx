import { ProjectsResponse } from "@/types/types";
import ProjectCard from "../../components/project-card";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const getMoreProjects = async (username: string): Promise<ProjectsResponse> => {
  const data = await fetch(`${apiUrl}/api/user/${username}/projects`, {
    cache: "no-store",
  });

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
    <div className="w-full grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {moreProjects?.map(({ id, projectName, images, user, tags }) => (
        <ProjectCard
          projectId={id}
          projectName={projectName}
          user={user}
          url={images[0].url}
          tags={tags}
          key={id}
        />
      ))}
    </div>
  );
};

export default MoreProjects;
