import { ProjectsResponse } from "@/types/types";
import Image from "next/image";

const getUserProjects = async (username: string): Promise<ProjectsResponse> => {
  const res = await fetch(
    `http://localhost:3000/api/user/${username}/projects`
  );
  return await res.json();
};

const UserProjects = async ({ username }: { username: string }) => {
  const data = await getUserProjects(username);

  const { ok, projects } = data;

  return (
    <section className="w-full max-w-screen-2xl">
      <div className=" p-4">
        <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          Projects
        </h2>
        <div className="columns-1 sm:columns-2 lg:columns-4 gap-4">
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
        </div>
      </div>
    </section>
  );
};

export default UserProjects;
