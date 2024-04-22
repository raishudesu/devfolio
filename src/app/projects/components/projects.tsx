"use client";

import { getProjectsUtil } from "@/utils/project-utils";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useEffect, useState } from "react";
import ProjectCard from "./project-card";

const Projects = () => {
  const { isFetching, isSuccess, data, error } = useQuery({
    queryKey: ["projects"],
    queryFn: getProjectsUtil,
    refetchOnWindowFocus: false,
  });

  return (
    <div>
      {/* {isFetching ? "Loading..." : null}
      {data?.projects?.map(
        ({ id, userId, user, projectName, description, images }) => (
          <ProjectCard
            projectName={projectName}
            description={description}
            url={images[0].url}
            user={user}
            key={id}
          />
        )
      )} */}
    </div>
  );
};

export default Projects;
