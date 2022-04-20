"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var books_1 = __importDefault(require("./models/handlers/books"));
var users_1 = __importDefault(require("./models/handlers/users"));
var app = (0, express_1["default"])();
var address = "0.0.0.0:3001";
app.use(body_parser_1["default"].json());
(0, books_1["default"])(app);
(0, users_1["default"])(app);
app.listen(3001, function () {
    console.log("Starting app on: ".concat(address));
});
