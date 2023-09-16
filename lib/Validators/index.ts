import validator from "validator";
import { BuiltInValidators, ValidatorFunction } from "..//Types/Validators";

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
export const Validators: BuiltInValidators = {
  REQUIRED: isRequired,
  MAX_LENGTH: (length: number) => isValidMaxLength(length),
  MAX_DECIMAL_DIGITS: (digits: number) => isValidMaxDigits(digits),
};
