import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import { userServerSchema } from "@/lib/zod";
import { createUser } from "@/services/user.service";
import {
  ExistingUserByEmailError,
  ExistingUserByUsername,
} from "@/utils/errors";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { email, username, firstName, lastName, password } =
      userServerSchema.parse(body); // VALIDATE BODY THRU ZOD SCHEMA

    // HASH PASSWORD
    const hashedPwd = await hash(password, 10);

    const bodyData = {
      username,
      firstName,
      lastName,
      email,
      password: hashedPwd,
    };

    const newUser = await createUser(bodyData);

    return NextResponse.json(
      { user: newUser, message: "User created successfully" },
      { status: 201 }
    );
  } catch (error) {
    if (
      error instanceof ExistingUserByEmailError ||
      error instanceof ExistingUserByUsername
    ) {
      return NextResponse.json(
        {
          ok: error.ok,
          errorMessage: error.errorMessage,
        },
        {
          status: error.code,
        }
      );
    }

    return NextResponse.json(
      { ok: false, message: "Something went wrong", error },
      { status: 500 }
    );
  }
}
