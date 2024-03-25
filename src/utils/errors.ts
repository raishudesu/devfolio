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

export class ExistingUserByEmailError extends Error {
  constructor(
    public ok: boolean,
    public errorMessage: string,
    public code: number
  ) {
    super(errorMessage);
    this.name = "ExistingUserByEmailError";
  }
}

export class ExistingUserByUsername extends Error {
  constructor(
    public ok: boolean,
    public errorMessage: string,
    public code: number
  ) {
    super(errorMessage);
    this.name = "ExistingUserByUsernameError";
  }
}

export class UserHasPortfolioError extends Error {
  constructor(
    public ok: boolean,
    public errorMessage: string,
    public code: number
  ) {
    super(errorMessage);
    this.name = "UserHasPortfolioError";
  }
}
