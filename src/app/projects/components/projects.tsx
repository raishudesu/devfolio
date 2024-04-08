"use client";

import { getProjectsUtil } from "@/utils/project-utils";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useEffect, useState } from "react";

const Projects = () => {
  const { isFetching, isSuccess, data, error } = useQuery({
    queryKey: ["projects"],
    queryFn: getProjectsUtil,
    refetchOnWindowFocus: false,
  });

  return (
    <div>
      {isFetching ? "Loading..." : null}
      {data?.projects?.map(
        ({ id, userId, projectName, description, images }) => (
          <div key={id}>
            <div>
              {projectName}
              <p>{description}</p>
            </div>
            <div>
              {images.map(({ url, projectId, id }, index) => (
                <Image
                  width={150}
                  height={150}
                  src={url}
                  alt={url}
                  key={index}
                />
              ))}
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default Projects;
