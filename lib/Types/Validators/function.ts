/**
 * Represents a validator function for performing data validation.
 *
 * @interface
 * @param {any} value - The value to be validated.
 */
export interface ValidatorFunction {
  /**
   * Validates the given value.
   * @param {any} value - The value to be validated.
   */
  (value: any): void;
}

export interface BuiltInValidators {
  /**
   * Validator function to check if a value is required (not null, undefined, or empty).
   *
   * @throws {Error} Throws an error if the value is null, undefined, or an empty string.
   */
  REQUIRED: ValidatorFunction;

  /**
   * Validator function to check if a value's length does not exceed the specified maximum length.
   *
   * @param {number} length - The maximum allowed length for the value.
   * @throws {ValidationError} if the value is not a string.
   * @throws {ValidationError} if the string exceeds maximum allowed length.
   */
  MAX_LENGTH: ValidatorFunction;

  /**
   * Validator function to check if a numeric value's decimal digits do not exceed the specified maximum digits.
   *
   * @param {number} digits - The maximum allowed decimal digits for the numeric value.
   * @throws {ValidationError} if the value is neither number or string.
   * @throws {ValidationError} if the value is not a valid number.
   * @throws {ValidationError} if the number exceeds maximum decimal digits.
   */
  MAX_DECIMAL_DIGITS: ValidatorFunction;
}
