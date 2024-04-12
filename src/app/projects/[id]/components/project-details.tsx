"use client";
import { getProjectUtil } from "@/utils/project-utils";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useParams } from "next/navigation";
import MoreProjects from "./more-projects";

const ProjectDetails = () => {
  const { id: projectId } = useParams();

  const {
    isFetching,
    isSuccess,
    data: projectData,
    error,
  } = useQuery({
    queryKey: ["project"],
    queryFn: async () => await getProjectUtil(projectId as string),
    refetchOnWindowFocus: false,
  });

  const project = projectData?.project!;

  return (
    <div>
      {isFetching ? "Loading..." : null}
      {isSuccess ? (
        <div>
          <h2>{project.projectName}</h2>
          <p>
            {project.user.firstName} {project.user.lastName}
          </p>
          {project.images.map(({ id, url }) => (
            <Image src={url} alt={url} key={id} width={150} height={150} />
          ))}

          <p>{project.description}</p>
          <MoreProjects id={project.id} userId={project.userId} />
        </div>
      ) : null}
    </div>
  );
};

export default ProjectDetails;
