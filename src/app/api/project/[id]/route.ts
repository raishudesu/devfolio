import { authOptions } from "@/lib/auth";
import prisma from "@/lib/db";
import { updateProjectSchema } from "@/lib/zod";
import {
  deleteProject,
  getProject,
  updateProject,
} from "@/services/project.service";
import { ProjectNotFoundError } from "@/utils/errors";
import { getServerSession } from "next-auth";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: Params }) {
  try {
    const { id } = params;

    const project = await getProject(id);
    return NextResponse.json(
      {
        ok: true,
        project,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    if (error instanceof ProjectNotFoundError) {
      return NextResponse.json(
        {
          ok: error.ok,
          name: error.name,
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
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request, { params }: { params: Params }) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  try {
    const { id } = params;
    const body = await req.json();

    const { description, projectName } = updateProjectSchema.parse(body);

    await getProject(id);

    const projectData = {
      description,
      projectName,
    };
    await updateProject(id, projectData);

    return NextResponse.json({
      ok: true,
      message: `Project with ID:${id} updated successfully.`,
    });
  } catch (error) {
    if (error instanceof ProjectNotFoundError) {
      return NextResponse.json(
        {
          ok: error.ok,
          name: error.name,
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
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  try {
    const { id } = params;

    await deleteProject(id);

    return NextResponse.json(
      {
        ok: true,
        message: `Project with ID:${id} deleted successfully`,
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
      { status: 500 }
    );
  }
}
