import {
  deleteUser,
  getUserByUsername,
  updateUser,
} from "@/services/user.service";
import { UserNotFoundError } from "@/utils/errors";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: Params }) {
  try {
    const { username } = params;

    const user = await getUserByUsername(username);

    return NextResponse.json({ ok: true, user }, { status: 200 });
  } catch (error) {
    if (error instanceof UserNotFoundError) {
      return NextResponse.json(
        {
          ok: error.ok,
          error: {
            errorName: error.name,
            errorMessage: error.errorMessage,
          },
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
    const { username } = params;

    const body = await req.json();
    console.log(body);
    await updateUser(username, body);

    return NextResponse.json(
      {
        ok: true,
        message: `User with username:${username} updated successfully`,
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
    const { username } = params;

    await deleteUser(username);

    return NextResponse.json(
      {
        ok: true,
        message: `Account with username:${username} deleted successfully.`,
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
