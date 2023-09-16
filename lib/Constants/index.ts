import { DataType } from "../Schema";
import { Column } from "../Types/Schema";

export const DEFAULT_COLUMNS: Column[] = [
  { dataType: DataType.BIGINT, name: "ROWID", property: "id" },
  { dataType: DataType.BIGINT, name: "CREATORID", property: "createdBy" },
  { dataType: DataType.DATETIME, name: "CREATEDTIME", property: "createdTime" },
  { dataType: DataType.DATETIME, name: "MODIFIEDTIME", property: "modifiedTime" },
];
