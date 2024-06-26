import { CatalystApp } from "zcatalyst-sdk-node/lib/catalyst-app";
import { Column, Model, SchemaConfig } from "../Types/Schema";
import { Query } from "../Query";
import { DEFAULT_COLUMNS } from "../Constants";
import { SchemaValidator } from "../Validators/schema";

/**
 * Represents a model schema for a datastore table.
 * @param {SchemaConfig<T>} config - The configuration object for the Schema.
 * @example
 * ```js
 * const User = new Schema({
 *    tableName: "Users",
 *    model: UserModel,
 *    columns: columns,
 *    validators: validators
 * });
 * const user = User.new();
 * await User.app(app).create(user);
 * ```
 */
export class Schema<T> {
  /** This holds the table name of the model. */
  #table: string;

  /** This holds the columns of the model. */
  #columns: Column[];

  /** This holds a row with the default value pre-filled. */
  #row: Record<string, any> = {};

  /** This holds the class reference of the model. */
  #model: Model<T>;

  /** This holds the cached reference of columns and their column names. */
  #attributes: Record<string, Column> = {};

  /** This holds the cached reference of columns and their properties. */
  #properties: Record<string, Column> = {};

  constructor(config: SchemaConfig<T>) {
    // Validate configurations.
    SchemaValidator.validate(config);

    // Assign default configurations.
    this.#table = config.table;
    this.#columns = DEFAULT_COLUMNS.concat(config.columns);
    this.#model = config.model;

    for (const column of this.#columns) {
      // Cache default values for new row.
      if (column.defaultValue !== undefined) {
        this.#row[column.property] = column.defaultValue;
      }

      // Cache column name vs property mapping.
      this.#attributes[column.name] = column;
      this.#properties[column.property] = column;
    }
  }

  /**
   * Returns table name of the model as in datastore.
   *
   * @example
   * ```js
   * console.log(User.table) // Users
   * ```
   *
   * @returns {string} The name of the table.
   */
  get table(): string {
    return this.#table;
  }

  /**
   * Instantiates the model with the Catalyst app that can be used to query.
   *
   * @example
   * ```js
   * const app = catalyst.initialApp()
   * const user = await User.app(app).findById(2);
   * console.log(user.name)
   * ```
   *
   * @param app {CatalystApp}
   * @returns {Query<T>}
   */
  app(app: CatalystApp): Query<T> {
    return new Query<T>({ attributes: this.#attributes, schema: this, app: app, properties: this.#properties });
  }

  /**
   * Creates a new instance of the given model in the schema config.
   *
   * This will also assign default values in the instance.
   *
   * @example
   * ```js
   * const user = User.new();
   * console.log(user.confirmed) // false
   * ```
   *
   * @returns {T}
   */
  new(): T {
    const row = new this.#model();
    for (const key in this.#row) {
      (row as Record<string, any>)[key] = this.#row[key];
    }
    return row;
  }
}

export * from "./datatype";
