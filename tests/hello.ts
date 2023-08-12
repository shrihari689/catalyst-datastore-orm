import { DataType, Schema, Validators } from "./../dist";

function hello(property: any) {}

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
      validators: [Validators.REQUIRED, Validators.MAX_DECIMAL_DIGITS(2)],
    },
  ],
});

const users = User.listAll();

console.log(users.map((user) => user.id));
