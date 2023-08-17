import { CatalystApp } from "zcatalyst-sdk-node/lib/catalyst-app";
import { Schema } from "../Schema/Schema";
import Column from "../Schema/Column";

/**
 * Configuration options for querying data.
 */
export default interface QueryConfig<T> {
  /**
   * The schema associated with the data being queried.
   */
  schema: Schema<T>;

  /**
   * The Catalyst app instance.
   */
  app: CatalystApp;

  /**
   * Record of attributes with their corresponding columns.
   */
  attributes: Record<string, Column>;

  /**
   * Record of properties with their corresponding columns.
   */
  properties: Record<string, Column>;
}
