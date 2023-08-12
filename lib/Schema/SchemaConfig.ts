import Column from "./Column";

/**
 * Configuration options for a ModelSchema.
 */
interface SchemaConfig<T> {
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
   * @type {new (row: any) => T}
   */
  model: new (row: any) => T;
}

export default SchemaConfig;
