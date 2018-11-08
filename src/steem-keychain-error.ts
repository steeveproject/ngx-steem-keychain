import { Result } from './result';


export class SteemKeychainError extends Error {

    constructor(public result: Result) {
        super(result.message);
        Object.setPrototypeOf(this, SteemKeychainError.prototype);
    }
}
