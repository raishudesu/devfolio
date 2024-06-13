import { Button } from "@/components/ui/button";
import { authOptions } from "@/lib/auth";
import { UserResponse } from "@/types/types";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import CurrentProfileBtns from "./current-user-profile-btns";

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
  const session = await getServerSession(authOptions);

  const data = await getUserProfile(username);

  if (data.error?.errorName === "UserNotFoundError") {
    notFound();
  }

  const sessionUsername = session?.user.username;

  const isCurrentUser = username === sessionUsername;

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
            {isCurrentUser ? (
              <div className="flex flex-col md:flex-row gap-2 md:items-center">
                <CurrentProfileBtns />
              </div>
            ) : (
              <div className="flex flex-col md:flex-row gap-2">
                <Button className="p-6 rounded-full" size={"lg"}>
                  Get in touch
                </Button>
                <Button
                  className="p-6 rounded-full"
                  size={"lg"}
                  variant={"secondary"}
                >
                  Follow
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
