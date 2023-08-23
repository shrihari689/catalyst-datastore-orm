import validator from "validator";
import { ValidatorFunction } from "@Types/Validator";

const isRequired: ValidatorFunction = (value: any) => {
  if (value == undefined || value == null) {
    throw new Error("Value cannot be null or undefined.");
  }

  if (validator.isEmpty(value)) {
    throw new Error("Value cannot be blank.");
  }
};

const isValidMaxDigits: (digits: number) => ValidatorFunction = (digits: number) => {
  return (value: any) => {
    if (typeof value === "number" || typeof value === "string") {
      const num = value.toString();
      const config = { decimal_digits: `0,${digits}"` };

      if (!validator.isFloat(num)) {
        throw new Error(" should be a valid number.");
      }
      if (!validator.isDecimal(num, config)) {
        throw new Error(` can not have more than ${digits} decimal digits.`);
      }
    } else {
      throw new Error(" should be either number or string.");
    }
  };
};

const isValidMaxLength: (digits: number) => ValidatorFunction = (length: number) => {
  return (value: any) => {
    if (typeof value === "string") {
      if (!validator.isLength(value, { max: length })) {
        throw new Error(` can not be more than ${length} characters.`);
      }
    } else {
      throw new Error(" should be a string.");
    }
  };
};

/**
 * An object containing default validator functions to perform validation on data.
 *
 * Example:
 * ```js
 * const validations = [ Validators.MAX_LENGTH(255) ]
 * ```
 */
export const Validators: Record<string, Function> = Object.freeze({
  /**
   * Validator function to check if a value is required (not null, undefined, or empty).
   *
   * @throws {Error} Throws an error if the value is null, undefined, or an empty string.
   */
  REQUIRED: isRequired,

  /**
   * Validator function to check if a value's length does not exceed the specified maximum length.
   *
   * @param {number} length - The maximum allowed length for the value.
   * @throws {ValidationError} if the value is not a string.
   * @throws {ValidationError} if the string exceeds maximum allowed length.
   */
  MAX_LENGTH: (length: number) => isValidMaxLength(length),

  /**
   * Validator function to check if a numeric value's decimal digits do not exceed the specified maximum digits.
   *
   * @param {number} digits - The maximum allowed decimal digits for the numeric value.
   * @throws {ValidationError} if the value is neither number or string.
   * @throws {ValidationError} if the value is not a valid number.
   * @throws {ValidationError} if the number exceeds maximum decimal digits.
   */
  MAX_DECIMAL_DIGITS: (digits: number) => isValidMaxDigits(digits),
});
