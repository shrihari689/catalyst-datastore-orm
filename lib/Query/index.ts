import QueryConfig from "lib/Types/Query";
import { Comparator } from "lib/Types/Keyword";
import Limit from "lib/Keyword/Limit";
import OrderBy from "lib/Keyword/OrderBy";
import Select from "lib/Keyword/Select";
import Where from "lib/Keyword/Where";
import Condition from "lib/Keyword/Condition";
import DatabaseService from "lib/Service/database";

/**
 * Represents a Data Access layer which encapsulates the Catalyst app.
 *
 * @example
 * ```js
 * const data = User.new();
 * data.name = "Guest"
 * const user = User.app(app).create(data);
 * console.log(user.id)
 * ```
 */
export class Query<T> {
  // This holds the configurations related to the schema.
  #config: QueryConfig<T>;

  constructor(config: QueryConfig<T>) {
    this.#config = config;
  }

  /**
   * Selects specific fields of the model in datastore.
   * It should either space-separated string or an array of string denoting properties of the model.
   *
   * @example
   * ```js
   * const users = await User.app(app).select("id name").get();
   * console.log(users);
   * ```
   *
   * @param {string | string[]} columns - The fields(s) to select from the data.
   * @returns {Select<T>} A query object for further operations.
   */
  select(fields: string | string[]): Select<T> {
    if (!Array.isArray(fields)) {
      fields = fields.split(" ");
    }
    const query = {
      table: this.#config.schema.table,
      columns: fields,
    };
    return new Select(this.#config, query);
  }

  /**
   * Specifies a condition to filter data based on a field.
   *
   * @example
   * ```js
   * const users = await User.app(app).where("login_count", ">=", 5).get();
   * console.log(users);
   * ```
   *
   * @param {string} field - The field to apply the condition on.
   * @param {Comparator} comparator - The comparison operator for the condition.
   * @param {any} value - The value to compare against.
   * @returns {Where<T>} A query object for further operations.
   */
  where(field: string, comparator: Comparator, value: any): Where<T> {
    const query = {
      table: this.#config.schema.table,
      condition: new Condition(field, comparator, value),
    } as const;
    return new Where(this.#config, query);
  }

  /**
   * Filters the data based on a provided condition.
   *
   * This method can be used for complex filter conditions.
   *
   * @example
   * ```js
   * const age = new Condition("age", "<", 18);
   * const height = new Condition("height", ">", 120);
   * const condition = age.or(height);
   * const users = await User.app(app).filter(condition).get();
   * console.log(users);
   * ```
   *
   * @param {Condition} condition - The condition to filter data.
   * @returns {Where<T>} A query object for further operations.
   */
  filter(condition: Condition): Where<T> {
    const query = {
      table: this.#config.schema.table,
      condition: condition,
    } as const;
    return new Where(this.#config, query);
  }

  /**
   * Sorts data based on a specified field and order. By default, the sorting order will be ascending.
   *
   * @example
   * ```js
   * const users = await User.app(app).sort("name").limit(5).get();
   * console.log(users);
   * ```
   *
   * @param {string} field - The field to sort the data by.
   * @param {boolean} [reverse=false] - Whether to sort in reverse order.
   * @returns {OrderBy<T>} A query object for further operations.
   */
  sort(field: string, reverse: boolean = false): OrderBy<T> {
    const query = {
      table: this.#config.schema.table,
      sort: { column: field, reverse },
    } as const;
    return new OrderBy(this.#config, query);
  }

  /**
   * Specifies a limit on the number of items to retrieve and an optional offset.
   * By default, the offset value will be 0.
   *
   * @example
   * ```js
   * const users = await User.app(app).limit(5).get();
   * console.log(users);
   * ```
   *
   * @param {number} limit - The maximum number of items to retrieve.
   * @param {number} [offset=0] - The starting offset for retrieving items.
   * @returns {Limit<T>} A query object for further operations.
   */
  limit(limit: number, offset: number = 0): Limit<T> {
    const query = {
      table: this.#config.schema.table,
      limit: { limit, offset },
    } as const;
    return new Limit(this.#config, query);
  }

  /**
   * Find a record by its ID in the specified table.
   *
   * @example
   * ```js
   * try {
   *    const user = await User.app(app).findById(17512000000066001);
   *    console.log(user.name);
   * } catch (e) {
   *    if (e instanceof EntityNotFoundError) {
   *      console.log("User not found!")
   *    }
   * }
   * ```
   *
   * @param {number|string} id The unique identifier of the record to find.
   * @throws {EntityNotFoundError} Throws an error if the entity is not found.
   */
  async findById(id: number | string): Promise<T> {
    return new DatabaseService(this.#config).findById(id);
  }
}
