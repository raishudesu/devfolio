import { getUsersByProjectLikes } from "@/services/user.service";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  try {
    const users = await getUsersByProjectLikes();

    return NextResponse.json(
      {
        ok: true,
        users,
      },
      {
        status: 200,
      }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        ok: false,
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
};
