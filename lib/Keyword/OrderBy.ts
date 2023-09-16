import QueryConfig from "../Types/Query";
import Keyword from "../Types/Keyword";
import Limit from "../Keyword/Limit";

export default class OrderBy<T> {
  #config: QueryConfig<T>;
  #query: Keyword;

  constructor(config: QueryConfig<T>, query: Keyword) {
    this.#config = config;
    this.#query = { ...query };
  }

  limit(limit: number, offset: number = 0): Limit<T> {
    const query = { ...this.#query };
    query.limit = { limit, offset };
    return new Limit(this.#config, query);
  }

  async get(): Promise<T[]> {
    return [];
  }
}
