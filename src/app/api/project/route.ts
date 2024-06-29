import { authOptions } from "@/lib/auth";
import { projectSchema } from "@/lib/zod";
import { createProject, getProjects } from "@/services/project.service";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();

    const validatedBody = projectSchema.parse(body);

    const project = await createProject(validatedBody);

    return NextResponse.json({ ok: true, project }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ ok: false, error }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const projects = await getProjects();

    return NextResponse.json(
      {
        ok: true,
        projects,
      },
      {
        status: 200,
      }
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
