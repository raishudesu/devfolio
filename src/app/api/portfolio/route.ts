import { portfolioSchema } from "@/lib/zod";
import { createPortfolio, getPortfolios } from "@/services/portfolio.service";
import { getUser } from "@/services/user.service";
import { UserHasPortfolioError } from "@/utils/errors";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { userId, description, coverImageLink } = portfolioSchema.parse(body);

    await getUser(userId);

    const portfolioData = {
      userId,
      description,
      coverImageLink,
    };

    const portfolio = await createPortfolio(portfolioData);

    return NextResponse.json({ ok: true, portfolio }, { status: 201 });
  } catch (error) {
    if (error instanceof UserHasPortfolioError) {
      return NextResponse.json(
        {
          ok: error.ok,
          errorMessage: error.errorMessage,
          name: error.name,
        },
        {
          status: error.code,
        }
      );
    }

    return NextResponse.json({ ok: false, error }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const portfolios = await getPortfolios();

    return NextResponse.json(
      {
        ok: true,
        portfolios,
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
