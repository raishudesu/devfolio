"use client";

import { ProjectType } from "@/types/types";
import { getProjectUtil } from "@/utils/project-utils";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useParams } from "next/navigation";

const ProjectPage = () => {
  const { id: projectId } = useParams();

  const { isFetching, isSuccess, data, error } = useQuery({
    queryKey: ["project"],
    queryFn: async () => await getProjectUtil(projectId as string),
    refetchOnWindowFocus: false,
  });

  const { project } = data!;

  return (
    <div>
      <h2>{project.projectName}</h2>
      <p>
        {project.user.firstName} {project.user.lastName}
      </p>
      {project.images.map(({ id, url }) => (
        <Image src={url} alt={url} key={id} width={150} height={150} />
      ))}

      <p>{project.description}</p>
    </div>
  );
};

//include more projects by the user

export default ProjectPage;
