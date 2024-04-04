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

export class ProjectNotFoundError extends Error {
  constructor(
    public ok: boolean,
    public errorMessage: string,
    public code: number
  ) {
    super(errorMessage);
    this.name = "ProjectNotFoundError";
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

export class UserHasProjectError extends Error {
  constructor(
    public ok: boolean,
    public errorMessage: string,
    public code: number
  ) {
    super(errorMessage);
    this.name = "UserHasProjectError";
  }
}
