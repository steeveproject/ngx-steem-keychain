import { Response } from '../response';


export class SteemKeychainError extends Error {

  constructor(public response: Response) {
    super(response.message);
    Object.setPrototypeOf(this, SteemKeychainError.prototype);
  }
}
