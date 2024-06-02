import { projectSchema } from "@/lib/zod";
import { createProject, getProjects } from "@/services/project.service";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
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
