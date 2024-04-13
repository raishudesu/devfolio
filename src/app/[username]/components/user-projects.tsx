import { getProjectsByUserUtil } from "@/utils/project-utils";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

const UserProjects = ({ userId }: { userId: string }) => {
  const { isFetching, isSuccess, data, error } = useQuery({
    queryKey: ["userProjects"],
    queryFn: async () => getProjectsByUserUtil(userId),
    refetchOnWindowFocus: false,
  });

  const projects = data?.projects;

  return (
    <section className="w-full">
      <div className=" p-4">
        <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          Projects
        </h2>
        <div className="flex flex-col gap-4">
          {isSuccess ? (
            <>
              {projects?.map(({ id, projectName, images }) => (
                <div key={id} className="rounded-sm border overflow-hidden">
                  <Image
                    src={images[0].url}
                    alt={images[0].url}
                    width={500}
                    height={500}
                  />
                  {/* <h1>{projectName}</h1> */}
                </div>
              ))}
            </>
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default UserProjects;
