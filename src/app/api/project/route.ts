import { projectSchema } from "@/lib/zod";
import { createProject, getProjects } from "@/services/project.service";
import { getUser } from "@/services/user.service";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { userId, description, projectName } = projectSchema.parse(body);

    await getUser(userId);

    const projectData = {
      userId,
      projectName,
      description,
    };

    const project = await createProject(projectData);

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
