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
exports.__esModule = true;
var books_1 = require("../books");
var users_1 = require("./users");
var bookHandler = new books_1.BooksStore();
var index = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var myBooks, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, bookHandler.index()];
            case 1:
                myBooks = _a.sent();
                res.json(myBooks);
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                res.status(400).json(error_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var create = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var book, myBooks, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                book = {
                    title: req.body.title,
                    author: req.body.author,
                    total_pages: req.body.total_pages,
                    type: req.body.type,
                    summary: req.body.summary
                };
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, bookHandler.create(book)];
            case 2:
                myBooks = _a.sent();
                res.json(myBooks);
                return [3 /*break*/, 4];
            case 3:
                error_2 = _a.sent();
                res.status(400).json(error_2);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
var show = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, myBooks, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.params.id;
                return [4 /*yield*/, bookHandler.show(id)];
            case 1:
                myBooks = _a.sent();
                res.json(myBooks);
                return [3 /*break*/, 3];
            case 2:
                error_3 = _a.sent();
                res.status(400).json(error_3);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var update = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, _a, title, author, total_pages, myBooks, error_4;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                id = req.params.id;
                _a = req.body, title = _a.title, author = _a.author, total_pages = _a.total_pages;
                return [4 /*yield*/, bookHandler.update(id, title, author, total_pages)];
            case 1:
                myBooks = _b.sent();
                res.json(myBooks);
                console.log(myBooks);
                return [3 /*break*/, 3];
            case 2:
                error_4 = _b.sent();
                res.status(400).json(error_4);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var deleteBook = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, myBooks, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.params.id;
                return [4 /*yield*/, bookHandler["delete"](id)];
            case 1:
                myBooks = _a.sent();
                res.json(myBooks);
                return [3 /*break*/, 3];
            case 2:
                error_5 = _a.sent();
                res.status(400).json(error_5);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var books_routes = function (app) {
    app.get('/books', index);
    app.post('/books', users_1.verifyAuthToken, create);
    app.get('/books/:id', show);
    app.put('/books/:id', users_1.verifyAuthToken, update);
    app["delete"]('/books/:id', deleteBook);
};
exports["default"] = books_routes;
