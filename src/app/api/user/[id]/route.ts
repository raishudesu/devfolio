import { authOptions } from "@/lib/auth";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: Params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        {
          ok: false,
          message: "Unauthorized",
        },
        { status: 401 }
      );
    }

    const { id } = params;

    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          ok: false,
          message: `User with ID:${id} does not exist.`,
        },
        { status: 404 }
      );
    }

    // exclude password in returned data
    const { password: userPassword, ...rest } = user!;

    return NextResponse.json(
      {
        ok: true,
        user: { ...rest },
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error,
      },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request, { params }: { params: Params }) {
  try {
    const { id } = params;

    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    // check if user exists
    if (!user) {
      return NextResponse.json(
        {
          ok: false,
          message: `User with ID:${id} does not exist.`,
        },
        { status: 404 }
      );
    }

    await prisma.user.update({
      where: {
        id,
      },
      data: {
        active: false,
      },
    });

    return NextResponse.json(
      {
        ok: true,
        message: `Account with ID:${id} deleted successfully.`,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error,
      },
      {
        status: 500,
      }
    );
  }
}
