import prisma from "@/lib/db";
import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import { userServerSchema } from "@/lib/zod";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { email, username, firstName, lastName, password } =
      userServerSchema.parse(body); // VALIDATE BODY THRU ZOD SCHEMA

    // CHECK UNIQUE EMAIL
    const existingEmail = await prisma.user.findUnique({
      where: { email: email },
    });

    if (existingEmail) {
      return NextResponse.json(
        { user: null, message: "A user with this email already exists" },
        { status: 409 }
      );
    }

    // CHECK UNIQUE USERNAME
    const existingUsername = await prisma.user.findUnique({
      where: { username: username },
    });

    if (existingUsername) {
      return NextResponse.json(
        { user: null, message: "A user with this username already exists" },
        { status: 409 }
      );
    }

    // HASH PASSWORD
    const hashedPwd = await hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        username,
        firstName,
        lastName,
        email,
        password: hashedPwd,
      },
    });

    // EXCLUDE PASSWORD UPON SUCCESS RESPONSE
    const { password: newUserPassword, ...rest } = newUser;

    return NextResponse.json(
      { user: rest, message: "User created successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong", error },
      { status: 500 }
    );
  }
}
