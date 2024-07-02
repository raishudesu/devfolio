import { authOptions } from "@/lib/auth";
import { likeProject, unlikeProject } from "@/services/project.service";
import { getServerSession } from "next-auth";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { NextResponse } from "next/server";

export async function POST(req: Request, { params }: { params: Params }) {
  const session = await getServerSession(authOptions);
  try {
    const { userId, id } = params;

    await likeProject(id, userId, session?.user?.id as string);

    return NextResponse.json(
      {
        ok: true,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        ok: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request, { params }: { params: Params }) {
  try {
    const { userId, id } = params;

    await unlikeProject(id, userId);

    return NextResponse.json(
      {
        ok: true,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        ok: false,
        error,
      },
      { status: 500 }
    );
  }
}
