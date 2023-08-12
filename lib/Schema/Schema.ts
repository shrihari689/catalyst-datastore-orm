import { EntityNotFoundError } from "../Extras/Errors";
import Column from "./Column";
import SchemaConfig from "./SchemaConfig";

/**
 * Represents a model schema for a datastore table.
 * @param {SchemaConfig<T>} config - The configuration object for the Schema.
 *
 * @example
 * ```js
 * const User = new Schema({
 *    tableName: "Users",
 *    model: UserModel,
 *    columns: columns,
 *    validators: validators
 * });
 * const user = await User.find(1);
 * ```
 */
export class Schema<T> {
  /** This holds the table name of the model. */
  private _tableName: string;

  /** This holds the columns of the model. */
  private _columns: Column[];

  /** This holds a row with the default value pre-filled. */
  private _defaultRow: { [key: string]: any };

  /** This holds the class reference of the model. */
  private _model: new (row: any) => T;

  constructor(config: SchemaConfig<T>) {
    // Assign default configurations
    this._tableName = config.tableName;
    this._columns = config.columns;
    this._model = config.model;

    // Cache default values for .new()
    this._defaultRow = {};
    for (const column of this._columns) {
      this._defaultRow[column.name] = column.defaultValue;
    }
  }

  /**
   * Retrieve a list of data items from the associated datastore table.
   * By default, first 100 items will be returned.
   *
   * @example
   * ```js
   * const users = await User.listAll();
   * ```
   * @param {number} [limit] - An optional parameter to limit the number of items returned.
   * @returns {T[]} An array of data items representing records in the datastore table.
   */
  async listAll(limit: number = 100): Promise<T[]> {
    /* TODO: Implement the method */
    return [];
  }

  /**
   * Find a data item by its ROWID in the specified table.
   *
   * @example
   * ```js
   * try {
   *    const user = await User.findById(17512000000066001);
   *    console.log(user.name);
   * } catch (e) {
   *    if (e instanceof EntityNotFoundError) {
   *      console.log("User not found!")
   *    }
   * }
   * ```
   *
   * @param {number|string} id - The ID of the entity to find.
   * @throws {EntityNotFoundError} Throws an error if the entity is not found.
   */
  async findById(id: number | string): Promise<T> {
    /* TODO: Implement the method */
    const row = new this._model({});
    if (row === null) {
      throw new EntityNotFoundError();
    }
    return row;
  }

  new(): T {
    return new this._model(this._defaultRow);
  }
}
