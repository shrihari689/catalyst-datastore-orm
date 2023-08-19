"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var zcatalyst_sdk_node_1 = require("zcatalyst-sdk-node");
var dist_1 = require("./../dist");
var UserModel = /** @class */ (function () {
    function UserModel() {
    }
    return UserModel;
}());
var User = new dist_1.Schema({
    tableName: "Users",
    model: UserModel,
    columns: [
        {
            dataType: dist_1.DataType.BIGINT,
            name: "ROWID",
            property: "id",
            validators: [dist_1.Validators.REQUIRED, dist_1.Validators.MAX_DECIMAL_DIGITS(2)],
        },
        {
            dataType: dist_1.DataType.TEXT,
            name: "NAME",
            property: "name",
            validators: [dist_1.Validators.REQUIRED, dist_1.Validators.MAX_LENGTH(20)],
        },
    ],
});
var condition = new dist_1.Condition("name", "=", "Shri");
var app = zcatalyst_sdk_node_1.default.initialize({});
console.log(User.app(app));
