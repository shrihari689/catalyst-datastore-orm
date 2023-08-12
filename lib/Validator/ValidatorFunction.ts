/**
 * Represents a validator function for performing data validation.
 *
 * @interface
 * @param {any} value - The value to be validated.
 */
interface ValidatorFunction {
  /**
   * Validates the given value.
   * @param {any} value - The value to be validated.
   */
  (value: any): void;
}

export default ValidatorFunction;
