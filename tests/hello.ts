import catalyst from "zcatalyst-sdk-node";
import { Condition, DataType, Schema, Validators } from "../lib";
import { CatalystApp } from "zcatalyst-sdk-node/lib/catalyst-app";

class UserModel {
  id: any;
}

const User = new Schema({
  tableName: "Users",
  model: UserModel,
  columns: [
    {
      dataType: DataType.BIGINT,
      name: "ROWID",
      property: "id",
      validators: [Validators.REQUIRED, Validators.MAX_DECIMAL_DIGITS(2)],
    },
    {
      dataType: DataType.TEXT,
      name: "NAME",
      property: "name",
      validators: [Validators.REQUIRED, Validators.MAX_LENGTH(20)],
    },
  ],
});

const app = {} as CatalystApp;

console.log(User.app(app).where("id", ">", 1).where("id", "!=", 2).limit(10).get());
