import { getProjectsByUser } from "@/services/project.service";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: Params }) {
  try {
    const { id } = params;

    const projects = await getProjectsByUser(id);

    return NextResponse.json(
      {
        ok: true,
        projects,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        ok: true,
        error,
      },
      { status: 500 }
    );
  }
}
