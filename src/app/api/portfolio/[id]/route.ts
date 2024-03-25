import prisma from "@/lib/db";
import { updatePortfolioSchema } from "@/lib/zod";
import { getPortfolio, updatePortfolio } from "@/services/portfolio.service";
import { PortfolioNotFoundError } from "@/utils/errors";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: Params }) {
  try {
    const { id } = params;

    const portfolio = await getPortfolio(id);

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
    if (error instanceof PortfolioNotFoundError) {
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

    const { description, coverImageLink } = updatePortfolioSchema.parse(body);

    await getPortfolio(id);

    const portfolioData = {
      description,
      coverImageLink,
    };
    await updatePortfolio(id, portfolioData);

    return NextResponse.json({
      ok: true,
      message: `Portfolio with ID:${id} updated successfully.`,
    });
  } catch (error) {
    if (error instanceof PortfolioNotFoundError) {
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
