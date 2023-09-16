import { SchemaConfig } from "lib/Types/Schema";
import { Validators } from ".";

export class SchemaValidator {
  static validate<T>(config: SchemaConfig<T>) {
    if (!config.columns) {
      throw new Error("Columns must be defined or at least empty.");
    }

    if (!config.model) {
      throw new Error("A model must be provided for the Schema.");
    }

    if (!config.table) {
      throw new Error("Table name must not be empty.");
    }

    if (!Array.isArray(config.columns)) {
      throw new Error("Columns must be an array.");
    }
  }
}
