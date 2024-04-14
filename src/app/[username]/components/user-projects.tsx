import { getProjectsByUserUtil } from "@/utils/project-utils";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

const UserProjects = ({ userId }: { userId: string }) => {
  const { isFetching, isSuccess, data, error } = useQuery({
    queryKey: ["userProjects"],
    queryFn: async () => await getProjectsByUserUtil(userId),
    refetchOnWindowFocus: false,
  });

  console.log(data);
  const projects = data?.projects;

  return (
    <section className="w-full">
      <div className=" p-4">
        <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          Projects
        </h2>
        {isFetching ? "Loading projects..." : null}
        <div className="columns-1 sm:columns-2 lg:columns-4 gap-4">
          {isSuccess ? (
            <>
              {projects?.map(({ id, projectName, images }) => (
                <div
                  key={id}
                  className="rounded-sm overflow-hidden flex flex-col gap-4 pb-2"
                >
                  <Image
                    src={images[0].url}
                    alt={images[0].url}
                    width={500}
                    height={500}
                    className="rounded-sm w-full"
                  />
                  <small className="text-sm font-medium leading-none text-muted-foreground">
                    {projectName}
                  </small>
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
