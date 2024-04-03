"use client";

import { getUserByUsernameUtil } from "@/utils/userUtils";
import { useQuery } from "@tanstack/react-query";

const UserPage = ({ params }: { params: { username: string } }) => {
  const { username } = params;

  const { isFetching, isSuccess, data, error } = useQuery({
    queryKey: ["userByUsername"],
    queryFn: async () => await getUserByUsernameUtil(username),
    refetchOnWindowFocus: false,
  });

  console.log(data);

  return <div>User page</div>;
};

export default UserPage;
