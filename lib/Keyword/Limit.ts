import QueryConfig from "lib/Types/Query";
import Keyword from "lib/Types/Keyword";
import DatabaseService from "lib/Service/database";

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
