const { Validators, Schema, DataType } = require("../dist/");

class UserModel {
  constructor(row) {
    this.id = row["ROWID"];
  }
}

const User = new Schema({
  tableName: "Users",
  model: UserModel,
  columns: [
    {
      dataType: DataType.BIGINT,
      name: "ROWID",
      validators: [Validators.REQUIRED, Validators.MAX_DECIMAL_DIGITS(2)],
    },
  ],
});

User.listAll().then((users) => {
  console.log(users.map((user) => user.id));
});
