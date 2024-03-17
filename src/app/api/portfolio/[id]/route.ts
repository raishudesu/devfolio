import prisma from "@/lib/db";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: Params }) {
  try {
    const { id } = params;

    const portfolio = await prisma.portfolio.findUnique({
      where: {
        id,
      },
    });

    if (!portfolio) {
      return NextResponse.json(
        {
          ok: false,
          message: "Portfolio doesn't exist!",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(
      {
        ok: true,
        portfolio,
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

export async function DELETE(req: Request, { params }: { params: Params }) {
  try {
    const { id } = params;

    const portfolio = await prisma.portfolio.delete({
      where: {
        id,
      },
    });

    if (!portfolio) {
      return NextResponse.json(
        {
          ok: false,
          message: "Portfolio to delete does not exist!",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        ok: true,
        message: "Portfolio deleted successfully",
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
