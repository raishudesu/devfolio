import { textAnimation } from "@/components/landing-page/hero";
import { TopUsersResponse } from "@/types/types";
import { Fragment } from "react";
import UserCard from "./user-card";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const getUsers = async (): Promise<TopUsersResponse> => {
  const users = await fetch(`${apiUrl}/api/user/project-likes`, {
    cache: "no-store",
  });
  return await users.json();
};

const Users = async () => {
  const data = await getUsers();

  return (
    <section className="min-h-screen w-full my-6">
      <div className="pb-6 flex items-center justify-between">
        <h1
          className={`scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0 ${textAnimation}`}
        >
          Top Devfoliopers
        </h1>
      </div>
      <div className="w-full grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.users.map(
          ({
            username,
            firstName,
            lastName,
            imageLink,
            totalLikes,
            isAvailableForWork,
          }) => (
            <Fragment key={username}>
              <UserCard
                username={username}
                firstName={firstName}
                lastName={lastName}
                imageLink={imageLink}
                totalLikes={totalLikes}
                isAvailableForWork={isAvailableForWork}
              />
            </Fragment>
          )
        )}
      </div>
    </section>
  );
};

export default Users;
