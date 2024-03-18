import prisma from "@/lib/db";
import { updatePortfolioSchema } from "@/lib/zod";
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
          message: `Portfolio with ID:${id} doesn't exist.`,
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

export async function PATCH(req: Request, { params }: { params: Params }) {
  try {
    const { id } = params;
    const body = await req.json();

    const { description, coverImageLink } = updatePortfolioSchema.parse(body);

    //check if the portfolio exists
    const portfolioExists = await prisma.portfolio.findUnique({
      where: {
        id,
      },
    });

    if (!portfolioExists) {
      return NextResponse.json(
        {
          ok: false,
          message: `Portfolio with ID:${id} does not exist.`,
        },
        {
          status: 404,
        }
      );
    }

    const portfolio = await prisma.portfolio.update({
      where: {
        id,
      },
      data: {
        description,
        coverImageLink,
      },
    });

    return NextResponse.json({
      ok: true,
      message: `Portfolio with ID:${portfolio.id} updated successfully.`,
    });
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

export async function DELETE(req: Request, { params }: { params: Params }) {
  try {
    const { id } = params;

    const portfolioExists = await prisma.portfolio.findUnique({
      where: {
        id,
      },
    });
    if (!portfolioExists) {
      return NextResponse.json(
        {
          ok: false,
          message: `Portfolio with ID:${id} does not exist.`,
        },
        { status: 404 }
      );
    }

    await prisma.portfolio.delete({
      where: {
        id,
      },
    });

    return NextResponse.json(
      {
        ok: true,
        message: `Portfolio with ID:${id} deleted successfully`,
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
