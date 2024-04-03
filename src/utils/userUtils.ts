import { UserResponse } from "@/types/types";

export const getUserByUsernameUtil = async (
  username: string
): Promise<UserResponse> => {
  try {
    const res = (await fetch(`/api/user/username/${username}`)) as UserResponse;

    const data = (await res.json()) as UserResponse;

    return data;
  } catch (error) {
    throw error;
  }
};
