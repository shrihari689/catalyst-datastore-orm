import squel, { Expression } from "squel";
import Keyword from "@Types/Keyword";
import { QueryConfig } from "@Types/Query";
import { Condition } from "@Keyword";

export default class DatabaseService<T> {
  #config: QueryConfig<T>;

  constructor(config: QueryConfig<T>) {
    this.#config = config;
  }

  async get(query: Keyword): Promise<T[]> {
    const sql = squel.select().from(this.#config.schema.table);

    if (query.columns !== undefined) {
      const fields = query.columns.map((column) => this.#config.properties[column].name);
      sql.fields(fields);
    }

    if (query.condition !== undefined) {
      const expr = this.#formWhere(query.condition, squel.expr());
      sql.where(expr);
    }

    if (query.sort !== undefined) {
      const field = query.sort.column;
      const column = this.#config.properties[field].name;
      sql.order(column, !query.sort.reverse);
    }

    if (query.limit !== undefined) {
      const { limit, offset } = query.limit;
      sql.limit(limit).offset(offset);
    } else {
      sql.limit(1000);
    }

    console.log("Going to execute: ", sql.toString());

    const app = this.#config.app;
    const zcql = app.zcql();

    const rows: T[] = [];

    const result = await zcql.executeZCQLQuery(sql.toString());

    for (const item of result) {
      const data = item[this.#config.schema.table];
      if (data !== undefined) {
        const row = this.#transformRow(data);
        rows.push(row);
      }
    }

    return rows;
  }

  /**
   * Queries datastore table with the given record identifier.
   *
   * @param {number|string} id The unique identifier of the record to find.
   * @throws {EntityNotFoundError} Throws an error if the entity is not found.
   */
  async findById(id: number | string): Promise<T> {
    const app = this.#config.app;
    const datastore = app.datastore();
    const table = datastore.table(this.#config.schema.table);
    const result = await table.getRow(id);
    const row = this.#transformRow(result);
    return row;
  }

  #formWhere(condition: Condition, expr: Expression): Expression {
    const operator = condition.operator;

    let left: Expression | string;
    let right: Expression | string;

    if (condition.left instanceof Condition) {
      left = this.#formWhere(condition.left, squel.expr());
    } else {
      const field = condition.left;
      const column = this.#config.properties[field].name;
      left = column;
    }

    if (condition.right instanceof Condition) {
      right = this.#formWhere(condition.right, squel.expr());
    } else {
      right = condition.right;
    }

    if (operator === "AND") {
      expr.and(squel.expr().and(left).and(right));
    } else if (operator === "OR") {
      expr.and(squel.expr().or(left).or(right));
    } else {
      expr.and(squel.expr().and(`${left} ${operator} ?`, right));
    }

    return expr;
  }

  #transformRow(data: Record<string, any>): T {
    const row = this.#config.schema.new();
    for (const column in data) {
      const meta = this.#config.attributes[column];
      if (meta !== undefined) {
        (row as Record<string, any>)[meta.property] = data[column];
      }
    }
    return row;
  }
}
