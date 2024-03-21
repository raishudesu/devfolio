import { authOptions } from "@/lib/auth";
import prisma from "@/lib/db";
import { deleteUser, getUser, updateUser } from "@/services/user.service";
import { getServerSession } from "next-auth";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { NextResponse } from "next/server";
import { UserNotFoundError } from "@/utils/errors";

export async function GET(req: Request, { params }: { params: Params }) {
  try {
    // const session = await getServerSession(authOptions);
    // if (!session) {
    //   return NextResponse.json(
    //     {
    //       ok: false,
    //       message: "Unauthorized",
    //     },
    //     { status: 401 }
    //   );
    // }

    const { id } = params;

    const user = await getUser(id);

    return NextResponse.json(
      {
        ok: true,
        user,
      },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof UserNotFoundError) {
      return NextResponse.json(
        {
          ok: error.ok,
          errorName: error.name,
          errorMessage: error.errorMessage,
        },
        { status: error.code }
      );
    }

    return NextResponse.json(
      {
        ok: false,
        error,
      },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request, { params }: { params: Params }) {
  try {
    const { id } = params;
    const body = req.json();

    await updateUser(id, body);

    return NextResponse.json(
      {
        ok: true,
        message: `User with ID:${id} updated successfully`,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    if (error instanceof UserNotFoundError) {
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

export async function DELETE(req: Request, { params }: { params: Params }) {
  try {
    const { id } = params;

    await deleteUser(id);

    return NextResponse.json(
      {
        ok: true,
        message: `Account with ID:${id} deleted successfully.`,
      },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof UserNotFoundError) {
      return NextResponse.json(
        {
          ok: error.ok,
          errorName: error.name,
          errorMessage: error.errorMessage,
        },
        { status: error.code }
      );
    }

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
