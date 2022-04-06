"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.BooksStore = void 0;
// @ts-ignore
var database_1 = __importDefault(require("../database"));
var BooksStore = /** @class */ (function () {
    function BooksStore() {
    }
    // read the database
    BooksStore.prototype.index = function () {
        return __awaiter(this, void 0, void 0, function () {
            var connection, sql, res, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1["default"].connect()];
                    case 1:
                        connection = _a.sent();
                        sql = "SELECT * FROM books";
                        return [4 /*yield*/, connection.query(sql)];
                    case 2:
                        res = _a.sent();
                        connection.release();
                        return [2 /*return*/, res.rows];
                    case 3:
                        error_1 = _a.sent();
                        throw new Error("Cannot get books ".concat(error_1));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    // create a new book in the database
    BooksStore.prototype.create = function (book) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, sql, values, result, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1["default"].connect()];
                    case 1:
                        connection = _a.sent();
                        sql = "INSERT INTO books (title, author, total_pages, type, summary) VALUES($1, $2, $3, $4, $5) RETURNING *";
                        values = [book.title, book.author, book.total_pages, book.type, book.summary];
                        return [4 /*yield*/, connection.query(sql, values)];
                    case 2:
                        result = _a.sent();
                        connection.release();
                        return [2 /*return*/, result.rows[0]];
                    case 3:
                        error_2 = _a.sent();
                        throw new Error("Cannot create new book ".concat(book.title, ". Error: ").concat(error_2));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    // get an item from the database by id
    BooksStore.prototype.show = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, sql, result, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1["default"].connect()];
                    case 1:
                        connection = _a.sent();
                        sql = 'SELECT * FROM books WHERE id=($1)';
                        return [4 /*yield*/, connection.query(sql, [id])];
                    case 2:
                        result = _a.sent();
                        connection.release();
                        return [2 /*return*/, result.rows[0]];
                    case 3:
                        error_3 = _a.sent();
                        throw new Error("Could not find book ".concat(id, ". Error: ").concat(error_3));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    // update an item in the database by id
    BooksStore.prototype.update = function (id, book) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, sql, values, result, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1["default"].connect()];
                    case 1:
                        connection = _a.sent();
                        sql = 'UPDATE books SET title = $1, author = $2 WHERE id=($3) RETURNING *';
                        values = [book.title, book.author];
                        return [4 /*yield*/, connection.query(sql, values, [id])];
                    case 2:
                        result = _a.sent();
                        connection.release();
                        return [2 /*return*/, result.rows[0]];
                    case 3:
                        error_4 = _a.sent();
                        throw new Error("Could not update book ".concat(id, ". Error: ").concat(error_4));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    // delete from the database
    BooksStore.prototype["delete"] = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, sql, result, books, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1["default"].connect()];
                    case 1:
                        connection = _a.sent();
                        sql = 'DELETE FROM books WHERE id=($1) RETURNING *';
                        return [4 /*yield*/, connection.query(sql, [id])];
                    case 2:
                        result = _a.sent();
                        books = result.rows[0];
                        connection.release();
                        return [2 /*return*/, books];
                    case 3:
                        err_1 = _a.sent();
                        throw new Error("Could not delete book ".concat(id, ". Error: ").concat(err_1));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return BooksStore;
}());
exports.BooksStore = BooksStore;
