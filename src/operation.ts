import { InvalidArgumentsError } from './errors/invalid-arguments-error';

/*
 * Operation represents a blockchain operation,
 * which has a name and some parameters.
 */
export class Operation {

  constructor (
    public name: string,
    public params: object
  ) { }

  /*
   * fromArray can be used to convert [operationName, operationParams] into an Operation.
   */
  static fromArray(operation: any[]): Operation {
    if (!operation) {
      throw new InvalidArgumentsError('operation array is unset');
    }
    if (operation.length !== 2) {
      throw new InvalidArgumentsError('operation array length invalid (must be 2)');
    }

    const [name, params] = operation;
    if (typeof name !== 'string') {
      throw new InvalidArgumentsError('operation[0] (operation name) must be a string');
    }
    if (typeof params !== 'object') {
      throw new InvalidArgumentsError('operation[1] (operation params) must be an object');
    }

    return new Operation(name, params);
  }

  /*
   * toArray turns [operationName, operationParams].
   */
  toArray(): any[] {
    return [this.name, this.params];
  }

  /*
   * toJSON implements custom JSON serialization.
   * It simply calls toArray() and returns the result.
   */
  toJSON(): any {
    return this.toArray();
  }
}
