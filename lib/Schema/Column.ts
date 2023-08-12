import DataType from "./DataType";
import ValidatorFunction from "../Validator/ValidatorFunction";

/**
 * Represents a column in a data table.
 * @interface Column
 */
interface Column {
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
   * Indicates if searching is enabled for this column.
   * @type {boolean}
   */
  isSearchEnabled?: boolean;

  /**
   * An array of validator functions to validate the column values.
   * @type {ValidatorFunction[]}
   */
  validators?: ValidatorFunction[];
}

export default Column;
