import prisma from "@/lib/db";
import { UserNotFoundError } from "@/utils/errors";

export const getUser = async (id: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user)
      throw new UserNotFoundError(
        false,
        `User with ID:${id} does not exist`,
        404
      );

    // exclude password in returned data
    const { password: userPassword, ...userDetails } = user!;

    return userDetails;
  } catch (error) {
    throw error;
  }
};

export const deleteUser = async (id: string) => {
  try {
    await getUser(id);

    // can be updated to check if user is already deleted (active: false)
    await prisma.user.update({
      where: {
        id,
      },
      data: {
        active: false,
      },
    });

    return;
  } catch (error) {
    throw error;
  }
};
