import { Comparator, Operator } from "lib/Types/Keyword";

/**
 * Represents a condition used for filtering data based on field, comparator, and value.
 *
 * This can be further used for `or()` and `and()` chaining.
 *
 * @example
 * ```js
 * const condition = new Condition("isOnline", "=", true);
 * await User.app(app).filter(condition).delete();
 * ```
 */
export default class Condition {
  left: Condition | string;
  operator: Comparator | Operator;
  right: Condition | any;

  constructor(field: string, comparator: Comparator, value: any) {
    this.left = field;
    this.operator = comparator;
    this.right = value;
  }

  and(condition: Condition): Condition {
    const and = new Condition("Dummy", "=", condition);
    and.left = this;
    and.operator = "AND";
    and.right = condition;
    return and;
  }

  or(condition: Condition): Condition {
    const or = new Condition("Dummy", "=", condition);
    or.left = this;
    or.operator = "OR";
    or.right = condition;
    return or;
  }
}
