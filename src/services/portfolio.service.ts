import prisma from "@/lib/db";
import { PortfolioNotFoundError } from "@/utils/errors";

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

export const updatePortfolio = async (id: string, data: object) => {
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
