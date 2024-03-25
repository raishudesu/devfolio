import prisma from "@/lib/db";
import { portfolioSchema } from "@/lib/zod";
import { PortfolioNotFoundError, UserHasPortfolioError } from "@/utils/errors";
import type { Portfolio } from "@prisma/client";
import { z } from "zod";

export const createPortfolio = async (
  data: z.infer<typeof portfolioSchema>
) => {
  try {
    // check if user has already posted their portfolio
    const userHasPortfolio = await prisma.portfolio.findUnique({
      where: {
        userId: data.userId,
      },
    });
    if (userHasPortfolio) {
      throw new UserHasPortfolioError(
        false,
        "Current user already posted a portfolio",
        403
      );
    }

    const portfolio = await prisma.portfolio.create({
      data,
    });

    return portfolio;
  } catch (error) {
    throw error;
  }
};

export const getPortfolio = async (id: string) => {
  try {
    const portfolio = await prisma.portfolio.findUnique({
      where: {
        id,
      },
    });

    if (!portfolio) {
      throw new PortfolioNotFoundError(
        false,
        `Portfolio with ID: ${id} does not exist`,
        404
      );
    }

    return portfolio;
  } catch (error) {
    throw error;
  }
};

export const getPortfolios = async () => {
  try {
    const portfolios = await prisma.portfolio.findMany();

    return portfolios;
  } catch (error) {
    throw error;
  }
};

export const updatePortfolio = async (id: string, data: object | Portfolio) => {
  try {
    await getPortfolio(id);

    await prisma.portfolio.update({
      where: {
        id,
      },
      data,
    });

    return;
  } catch (error) {
    throw error;
  }
};

export const deletePortfolio = async (id: string) => {
  try {
    await getPortfolio(id);

    await prisma.portfolio.delete({
      where: {
        id,
      },
    });

    return;
  } catch (error) {
    throw error;
  }
};
