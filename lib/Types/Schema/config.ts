import { Column } from "lib/Types/Schema";

// Type definition of a model
export type Model<T> = new () => T;

/**
 * Configuration options for a ModelSchema.
 */
export interface SchemaConfig<T> {
  /**
   * The table name of the model in the datastore.
   * @type {string}
   */
  tableName: string;

  /**
   * The columns in the table with their metadata.
   * @type {Column[]}
   */
  columns: Column[];

  /**
   * The model class constructor that takes a row of data as input and returns an instance of T.
   * @type {Model<T>}
   */
  model: Model<T>;
}
