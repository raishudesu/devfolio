import { Button } from "@/components/ui/button";
import { UserResponse } from "@/types/types";
import { notFound } from "next/navigation";

const getUserProfile = async (username: string): Promise<UserResponse> => {
  const res = await fetch(`http://localhost:3000/api/user/${username}`, {
    method: "GET",
    next: {
      revalidate: 5000,
    },
  });

  return await res.json();
};

const Profile = async ({ username }: { username: string }) => {
  const data = await getUserProfile(username);

  if (data.error?.errorName === "UserNotFoundError") {
    notFound();
  }

  return (
    <section className="mt-4 w-full flex flex-col lg:items-center gap-4 max-w-screen-xl">
      <div className="w-full p-4">
        <div className="flex flex-col lg:flex-row gap-4 justify-center">
          <div className="w-20 h-20 bg-slate-500 rounded-full flex justify-center items-center">
            PFP
          </div>
          <div className="flex flex-col gap-4 pb-4  max-w-screen-sm ">
            <h1 className="mt-4 lg:mt-0 scroll-m-20 text-2xl font-bold tracking-tight">
              {data?.user.firstName} {data?.user.lastName}
            </h1>
            <p className="leading-7 text-sm">
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
