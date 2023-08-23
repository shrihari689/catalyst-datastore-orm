import DatabaseService from "@Service/database";
import Keyword from "@Types/Keyword";
import { QueryConfig } from "@Types/Query";

export default class Limit<T> {
  #config: QueryConfig<T>;
  #query: Keyword;

  constructor(config: QueryConfig<T>, query: Keyword) {
    this.#config = config;
    this.#query = { ...query };
  }

  async get(): Promise<T[]> {
    return new DatabaseService(this.#config).get(this.#query);
  }
}
