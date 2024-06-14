import prisma from "@/lib/db";
import { updateProjectSchema } from "@/lib/zod";
import { getProject, updateProject } from "@/services/project.service";
import { ProjectNotFoundError } from "@/utils/errors";
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
  try {
    const { id } = params;

    const projectExists = await prisma.project.findUnique({
      where: {
        id,
      },
    });
    if (!projectExists) {
      return NextResponse.json(
        {
          ok: false,
          message: `Project with ID:${id} does not exist.`,
        },
        { status: 404 }
      );
    }

    await prisma.project.delete({
      where: {
        id,
      },
    });

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
