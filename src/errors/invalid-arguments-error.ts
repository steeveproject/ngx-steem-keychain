export class InvalidArgumentsError extends Error {

  constructor(public message: string) {
    super(message);
    Object.setPrototypeOf(this, InvalidArgumentsError.prototype);
  }
}
