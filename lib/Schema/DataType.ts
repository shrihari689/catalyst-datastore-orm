/**
 * Represents various data types that can be used in the datastore.
 *
 * Example:
 * ```js
 * const column = { dataType: DataType.TEXT }
 * ```
 * @enum {string}
 */
export enum DataType {
  /**
   * Represents a short text data type.
   * Max Limit: 65535 characters.
   */
  TEXT = "text",

  /**
   * Represents a variable character data type.
   * Max Limit: 255 characters.
   */
  VARCHAR = "varchar",

  /**
   * Represents a date data type.
   * Stores date values.
   */
  DATE = "date",

  /**
   * Represents a date and time data type.
   * Stores date and time values.
   */
  DATETIME = "dateTime",

  /**
   * Represents an integer data type.
   * Stores whole number values.
   */
  INT = "int",

  /**
   * Represents a double precision floating-point data type.
   * Stores floating-point values with high precision.
   */
  DOUBLE = "double",

  /**
   * Represents a boolean data type.
   * Stores true or false values.
   */
  BOOLEAN = "boolean",

  /**
   * Represents a big integer data type.
   * Stores large whole number values.
   */
  BIGINT = "bigint",

  /**
   * Represents a foreign key constraint.
   * Defines a reference to another table's primary key.
   */
  FOREIGNKEY = "foreign key",

  /**
   * Represents an encrypted text data type.
   * Stores text data in an encrypted form.
   */
  ENCRYPTEDTEXT = "Encrypted text",
}

export default DataType;
