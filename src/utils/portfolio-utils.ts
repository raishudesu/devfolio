import { PortfolioResponse } from "@/types/types";

export const getPortfoliosUtil = async (): Promise<PortfolioResponse> => {
  try {
    const res = (await fetch("/api/portfolio")) as PortfolioResponse;

    const data = (await res.json()) as PortfolioResponse;

    return data;
  } catch (error: any) {
    throw error;
  }
};
