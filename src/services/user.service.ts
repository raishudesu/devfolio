import prisma from "@/lib/db";
import { userServerSchema } from "@/lib/zod";
import {
  ExistingUserByEmailError,
  ExistingUserByUsername,
  UserNotFoundError,
} from "@/utils/errors";
import type { User } from "@prisma/client";
import { compare } from "bcrypt";
import { z } from "zod";

export const existingUserByEmail = async (email: string) => {
  try {
    const existingEmail = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingEmail) {
      throw new ExistingUserByEmailError(
        false,
        `A user already exists with email: ${email}`,
        403
      );
    }

    return;
  } catch (error) {
    throw error;
  }
};

export const existingUserByUsername = async (username: string) => {
  try {
    const existingUsername = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (existingUsername) {
      throw new ExistingUserByUsername(
        false,
        `A user already exists with username: ${username}`,
        403
      );
    }

    return;
  } catch (error) {
    throw error;
  }
};

export const createUser = async (data: z.infer<typeof userServerSchema>) => {
  try {
    await existingUserByEmail(data.email);
    await existingUserByUsername(data.username);

    const user = await prisma.user.create({
      data,
    });

    const { password: newUserPassword, ...userDetails } = user;
    return userDetails;
  } catch (error) {
    throw error;
  }
};

export const loginUser = async (email: string, credentialPwd: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new UserNotFoundError(false, "Account does not exist", 404);
    }

    const passwordMatched = await compare(credentialPwd, user.password);

    if (!passwordMatched) throw new Error("Incorrect password");

    return user;
  } catch (error) {
    throw error;
  }
};

export const getUserByUsername = async (username: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (!user)
      throw new UserNotFoundError(
        false,
        `User with username:${username} does not exist`,
        404
      );

    const { password: userPassword, ...userDetails } = user!;
    return userDetails;
  } catch (error) {
    throw error;
  }
};

export const updateProfileImage = async (
  usernameParams: string,
  body: { imageLink: string }
) => {
  try {
    await prisma.user.update({
      where: {
        username: usernameParams,
      },
      data: {
        imageLink: body.imageLink,
      },
    });

    return;
  } catch (error) {
    throw error;
  }
};

export const updateUser = async (
  usernameParams: string,
  body: { username: string; email: string }
) => {
  try {
    const isUsernameExists = await prisma.user.findUnique({
      where: {
        username: body.username,
      },
    });

    if (isUsernameExists)
      throw new ExistingUserByUsername(false, "Username is already taken", 500);

    await prisma.user.update({
      where: {
        username: usernameParams,
      },
      data: {
        username: body.username,
        email: body.username,
      },
    });

    return;
  } catch (error) {
    throw error;
  }
};

export const deleteUser = async (username: string) => {
  try {
    await getUserByUsername(username);

    // can be updated to check if user is already deleted (active: false)
    await prisma.user.update({
      where: {
        username,
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
