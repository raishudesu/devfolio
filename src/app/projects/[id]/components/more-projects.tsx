import { getProjectsByUserUtil } from "@/utils/project-utils";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

const MoreProjects = ({ id, userId }: { id: string; userId: string }) => {
  const { isFetching, isSuccess, data, error } = useQuery({
    queryKey: ["more-projects"],
    queryFn: async () => getProjectsByUserUtil(userId),
    refetchOnWindowFocus: false,
  });

  const moreProjects = data?.projects.filter((project) => project.id !== id);

  // console.log(data);

  return (
    <div>
      {isSuccess ? (
        <>
          {moreProjects?.map(({ images }, index) => (
            <Image
              src={images[0].url}
              alt={images[0].url}
              width={150}
              height={150}
              key={index}
            />
          ))}
        </>
      ) : null}
    </div>
  );
};

export default MoreProjects;
