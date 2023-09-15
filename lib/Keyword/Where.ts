import Keyword, { Comparator } from "lib/Types/Keyword";
import QueryConfig from "lib/Types/Query";
import Limit from "lib/Keyword/Limit";
import OrderBy from "lib/Keyword/OrderBy";
import Condition from "lib/Keyword/Condition";
import DatabaseService from "lib/Service/database";

/**
 * Represents a 'Where' clause used in a query to filter data based on conditions.
 *
 * @example
 * ```js
 * const products = await Product.app(app)
 *                      .where("stock", ">=", 100)
 *                      .where("price", "<", 1000).get();
 * console.log(products[0].id);
 * ```
 */
export default class Where<T> {
  #config: QueryConfig<T>;
  #query: Keyword;

  constructor(config: QueryConfig<T>, query: Keyword) {
    this.#config = config;
    this.#query = { ...query };
  }

  /**
   * Specifies a condition to filter data based on a field and returns the selected fields.
   *
   * @example
   * ```js
   * const products = await Product.app(app)
   *                      .where("stock", ">=", 100)
   *                      .where("price", "<", 1000).get();
   * console.log(products[0].id);
   * ```
   *
   * @param {string} field - The field to apply the condition on.
   * @param {Comparator} comparator - The comparison operator for the condition.
   * @param {any} value - The value to compare against.
   * @returns {Where<T>} A query object for further operations.
   */
  where(field: string, comparator: Comparator, value: any): Where<T> {
    const query = { ...this.#query };
    const condition = new Condition(field, comparator, value);
    if (query.condition) {
      query.condition = query.condition.and(condition);
    } else {
      query.condition = condition;
    }
    return new Where(this.#config, query);
  }

  /**
   * Sorts data based on a specified field and order.
   * By default, the sorting order will be ascending.
   *
   * @example
   * ```js
   * const students = await Student.app(app)
   *                        .where("marks", ">=", 90)
   *                        .sort("name").get();
   * console.log(students);
   * ```
   *
   * @param {string} field - The field to sort the data by.
   * @param {boolean} [reverse=false] - Whether to sort in reverse order.
   * @returns {OrderBy<T>} A query object for further operations.
   */
  sort(field: string, reverse: boolean = false): OrderBy<T> {
    const query = { ...this.#query };
    query.sort = { column: field, reverse };
    return new OrderBy(this.#config, query);
  }

  /**
   * Specifies a limit on the number of items to retrieve and an optional offset.
   * By default, the offset value will be 0.
   *
   * @example
   * ```js
   * const users = await User.app(app)
   *                        .where("status", "=", "inactive")
   *                        .limit(5).get();
   * console.log(users);
   * ```
   *
   * @param {number} limit - The maximum number of items to retrieve.
   * @param {number} [offset=0] - The starting offset for retrieving items.
   * @returns {Limit<T>} A query object for further operations.
   */
  limit(limit: number, offset: number = 0): Limit<T> {
    const query = { ...this.#query };
    query.limit = { limit, offset };
    return new Limit(this.#config, query);
  }

  /**
   * Retrieves data based on the configured query and returns an array of results.
   *
   * @example
   * ```js
   * const users = await User.app(app).where("edition", "=", "Paid").get();
   * console.log(users[0].id)
   * ```
   */
  async get(): Promise<T[]> {
    return new DatabaseService(this.#config).get(this.#query);
  }

  /**
   * Retrieves data based on the configured query and returns an array of results.
   *
   * @example
   * ```js
   * const payload = { edition: "Free" };
   * const users = await User.app(app).where("edition", "=", "Paid").update(payload);
   * console.log(users[0].id)
   * ```
   */
  async update(): Promise<T[]> {
    return new DatabaseService(this.#config).get(this.#query);
  }
}
