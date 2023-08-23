import { DataType } from "@Schema/datatype";
import { ValidatorFunction } from "@Types/Validator";

/**
 * Represents a column in a data table.
 * @interface Column
 */
export interface Column {
  /**
   * The name of the column.
   * @type {string}
   */
  name: string;

  /**
   * The data type of the column.
   * @type {DataType}
   */
  dataType: DataType;

  /**
   * The default value of the column.
   * @type {any}
   */
  defaultValue?: any;

  /**
   * The value will be assigned to this property in the model.
   * @type {string}
   */
  property: string;

  /**
   * An array of validator functions to validate the column values.
   * @type {ValidatorFunction[]}
   */
  validators?: ValidatorFunction[];
}
