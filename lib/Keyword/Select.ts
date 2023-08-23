import { QueryConfig } from "@Types/Query";
import Keyword, { Comparator } from "@Types/Keyword";
import { Condition } from "@Keyword";
import Where from "./Where";
import Limit from "./Limit";
import OrderBy from "./OrderBy";
import DatabaseService from "@Service/database";

/**
 * Represents a query builder for selecting specific columns from the data.
 *
 * Further operations can be carried out using `where()`, `limit()` etc.
 *
 * @example
 * ```js
 * const users = await User.app(app).select(["id", "age"]).limit(10).get();
 * console.log(users)
 * ```
 */
export default class Select<T> {
  #config: QueryConfig<T>;
  #query: Keyword;

  constructor(config: QueryConfig<T>, query: Keyword) {
    this.#config = config;
    this.#query = { ...query };
  }

  /**
   * Filters the data based on a provided condition and returns the selected fields.
   *
   * This method can be used for complex filter conditions.
   *
   * @example
   * ```js
   * const age = new Condition("age", "<", 18);
   * const height = new Condition("height", ">", 120);
   * const condition = age.or(height);
   * const users = await User.app(app)
   *                      .select("name age")
   *                      .filter(condition).get();
   * console.log(users[1].age);
   * ```
   *
   * @param {Condition} condition - The condition to filter data.
   * @returns {Where<T>} A query object for further operations.
   */
  filter(condition: Condition): Where<T> {
    const query = { ...this.#query };
    query.condition = condition;
    return new Where(this.#config, query);
  }

  /**
   * Specifies a condition to filter data based on a field and returns the selected fields.
   *
   * @example
   * ```js
   * const users = await User.app(app)
   *                      .select("name age")
   *                      .where("age", "<=", 18).get();
   * console.log(users[0].age);
   * ```
   *
   * @param {string} field - The field to apply the condition on.
   * @param {Comparator} comparator - The comparison operator for the condition.
   * @param {any} value - The value to compare against.
   * @returns {Where<T>} A query object for further operations.
   */
  where(field: string, comparator: Comparator, value: any): Where<T> {
    const query = { ...this.#query };
    query.condition = new Condition(field, comparator, value);
    return new Where(this.#config, query);
  }

  /**
   * Specifies a limit on the number of items to retrieve and an optional offset.
   * By default, the offset value will be 0.
   *
   * @example
   * ```js
   * const users = await User.app(app)
   *                        .select("id name")
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
   * Sorts data based on a specified field and order.
   * By default, the sorting order will be ascending.
   *
   * @example
   * ```js
   * const users = await User.app(app)
   *                        .select("id name")
   *                        .sort("name").get();
   * console.log(users);
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
   * Retrieves data based on the configured query and returns an array of results.
   *
   * @example
   * ```js
   * const users = await User.app(app).select("id name").get();
   * console.log(users[0].id)
   * ```
   */
  async get(): Promise<T[]> {
    return new DatabaseService(this.#config).get(this.#query);
  }
}
