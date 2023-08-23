import { Condition } from "@Keyword/Condition";

/**
 * Represents various comparison operators for conditions.
 */
export type Comparator = "=" | "!=" | ">" | "<" | "<=" | ">=" | "<>";

/**
 * Represents logical operators for combining conditions.
 */
export type Operator = "AND" | "OR";

/**
 * Represents a keyword-based configuration for querying data.
 */
export default interface Keyword {
  /**
   * The table to query data from.
   */
  readonly table: string;

  /**
   * Optional array of columns to select from the table.
   */
  readonly columns?: string[];

  /**
   * Optional condition to filter data.
   */
  readonly condition?: Condition;

  /**
   * Optional limit and offset for data retrieval.
   */
  readonly limit?: {
    /**
     * The maximum number of items to retrieve.
     */
    limit: number;
    /**
     * The starting offset for retrieving items.
     */
    offset: number;
  };

  /**
   * Optional sorting configuration for the query.
   */
  readonly sort?: {
    /**
     * The column by which to sort the data.
     */
    column: string;
    /**
     * Whether to sort in reverse order (descending).
     */
    reverse: boolean;
  };
}
