const { Validators, Schema, DataType } = require("../dist/lib");

class UserModel {
  /**
   * @type {any}
   */
  id;
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
      defaultValue: "Anonymous",
      validators: [Validators.REQUIRED, Validators.MAX_LENGTH(20)],
    },
  ],
});

const user = User.new();
console.log(user);
