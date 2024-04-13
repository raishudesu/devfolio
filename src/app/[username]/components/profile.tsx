"use client";

import { Button } from "@/components/ui/button";
import { getUserByUsernameUtil } from "@/utils/userUtils";
import { useQuery } from "@tanstack/react-query";
import UserProjects from "./user-projects";

const Profile = ({ username }: { username: string }) => {
  const { isFetching, isSuccess, data, error } = useQuery({
    queryKey: ["userByUsername"],
    queryFn: async () => await getUserByUsernameUtil(username),
    refetchOnWindowFocus: false,
  });

  return (
    <section className="w-full flex flex-col gap-4">
      {isFetching ? "Loading..." : null}

      <div className="border-b p-4">
        <div className="w-20 h-20 bg-slate-500 rounded-full flex justify-center items-center">
          PFP
        </div>
        <div className="flex flex-col gap-4 pb-4">
          {isSuccess ? (
            <>
              <h1 className="mt-4 scroll-m-20 text-2xl font-medium tracking-tight lg:text-3xl">
                {data?.user.firstName} {data?.user.lastName}
              </h1>
              <p className="leading-7 [&:not(:first-child)]:mt-6">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Molestiae esse aspernatur tenetur ullam temporibus distinctio!
              </p>
              <div>
                <small className="text-sm font-medium leading-none text-muted-foreground">
                  1,000 followers 1,000 following 1,000 likes
                </small>
              </div>
              <div className="flex gap-4">
                <Button size={"lg"}>Get in touch</Button>
                <Button size={"lg"} variant={"secondary"}>
                  Follow
                </Button>
                <Button size={"lg"} variant={"secondary"}>
                  ...
                </Button>
              </div>
            </>
          ) : null}
        </div>
      </div>
      <UserProjects userId={data?.user?.id as string} />
    </section>
  );
};

export default Profile;
