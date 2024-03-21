export class UserNotFoundError extends Error {
  constructor(
    public ok: boolean,
    public errorMessage: string,
    public code: number
  ) {
    super(errorMessage);
    this.name = "UserNotFoundError";
  }
}

export class PortfolioNotFoundError extends Error {
  constructor(
    public ok: boolean,
    public errorMessage: string,
    public code: number
  ) {
    super(errorMessage);
    this.name = "PortfolioNotFoundError";
  }
}
