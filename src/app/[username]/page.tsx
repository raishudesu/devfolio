"use client";

import { getUserByUsernameUtil } from "@/utils/userUtils";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

const UserPage = ({ params }: { params: { username: string } }) => {
  const { username } = params;

  const { isFetching, isSuccess, data, error } = useQuery({
    queryKey: ["userByUsername"],
    queryFn: async () => await getUserByUsernameUtil(username),
    refetchOnWindowFocus: false,
  });

  if (!isFetching) {
    console.log(data);
  }
  return (
    <section>
      User page
      {isFetching ? "Loading..." : null}
      {isSuccess ? (
        <Image
          width={120}
          height={120}
          src={data?.user.imageLink as string}
          priority
          alt="profile-picture"
          className="border rounded-full"
        />
      ) : null}
      <div>
        <h2>
          {data?.user.firstName} {data?.user.lastName}
        </h2>
      </div>
    </section>
  );
};

export default UserPage;
