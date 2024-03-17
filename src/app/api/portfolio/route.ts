import prisma from "@/lib/db";
import { portfolioSchema } from "@/lib/zod";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { userId, description, coverImageLink } = portfolioSchema.parse(body);

    // check if the user exists by userId
    const checkUser = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!checkUser) {
      return NextResponse.json(
        {
          ok: false,
          message: "User does not exist!",
        },
        {
          status: 500,
        }
      );
    }

    const createPortfolio = await prisma.portfolio.create({
      data: {
        userId,
        description,
        coverImageLink,
      },
    });

    return NextResponse.json(
      { ok: true, portfolio: createPortfolio },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ ok: false, error }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const portfolios = await prisma.portfolio.findMany();

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
