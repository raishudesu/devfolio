import { Button } from "@/components/ui/button";
import { authOptions } from "@/lib/auth";
import { UserResponse } from "@/types/types";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import CurrentProfileBtns from "./current-user-profile-btns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { textAnimation } from "@/components/landing-page/hero";
import Link from "next/link";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const getUserProfile = async (username: string): Promise<UserResponse> => {
  const res = await fetch(`${apiUrl}/api/user/${username}`, {
    method: "GET",
    cache: "no-store",
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
          <Avatar className="w-full max-w-32 h-full max-h-32">
            <AvatarImage
              src={data?.user.imageLink as string}
              alt={`${data?.user.imageLink}-profile-image`}
            />
            <AvatarFallback className="min-h-32">CN</AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-4 pb-4  max-w-screen-sm ">
            <div className="flex flex-col">
              <h1
                className={`mt-4 lg:mt-0 scroll-m-20 text-2xl font-bold tracking-tight ${textAnimation}`}
              >
                {data?.user.firstName} {data?.user.lastName}
              </h1>
              <div className="mt-2 flex gap-2 items-center">
                {data.user.isAvailableForWork ? (
                  <>
                    <div className="w-2 h-2 bg-green-400 animate-pulse rounded-full"></div>
                    <small className="text-xs font-medium leading-none text-muted-foreground">
                      Available for work 🚀{" "}
                    </small>
                  </>
                ) : (
                  <>
                    <div className="w-2 h-2 bg-red-400 animate-pulse rounded-full"></div>
                    <small className="text-xsm text-muted-foreground">
                      Unavailable for work{" "}
                    </small>
                  </>
                )}
              </div>
            </div>
            <p className="leading-7 text-sm">
              {data?.user.bio ? (
                data.user?.bio
              ) : (
                <span className="text-muted-foreground">Bio not yet set.</span>
              )}
            </p>
            {data?.user.links.length > 0 ? (
              <div className="flex flex-col gap-2">
                <small
                  className={`text-sm font-bold leading-none ${textAnimation}`}
                >
                  Links
                </small>
                {data.user.links.map((link, index) => (
                  <Link href={link} key={index}>
                    <small className="text-sm font-medium leading-none text-muted-foreground hover:underline">
                      {link}
                    </small>
                  </Link>
                ))}
              </div>
            ) : null}
            {isCurrentUser ? (
              <div className="flex flex-col md:flex-row gap-2 md:items-center">
                <CurrentProfileBtns />
              </div>
            ) : // <div className="flex flex-col md:flex-row gap-2">
            //   <Button className="p-6 rounded-full" size={"lg"}>
            //     Get in touch
            //   </Button>
            //   <Button
            //     className="p-6 rounded-full"
            //     size={"lg"}
            //     variant={"secondary"}
            //   >
            //     Follow
            //   </Button>
            // </div>

            null}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
