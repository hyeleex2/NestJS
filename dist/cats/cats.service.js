"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCat = exports.updatePartialCat = exports.updateCat = exports.createCat = exports.readCat = exports.readAllCat = void 0;
var cats_model_1 = require("./cats.model");
var express_1 = require("express");
var router = express_1.Router();
var readAllCat = function (req, res) {
    try {
        var cats = cats_model_1.Cat;
        res.status(200).send({
            success: true,
            data: {
                cats: cats
            }
        });
    }
    catch (e) {
        res.status(400).send({
            success: false,
            error: e.message
        });
    }
};
exports.readAllCat = readAllCat;
var readCat = function (req, res) {
    try {
        var id_1 = req.params.id;
        var cat = cats_model_1.Cat.find(function (cat) { return cat.id === id_1; });
        res.status(200).send({
            success: true,
            data: {
                cat: cat
            }
        });
    }
    catch (e) {
        res.status(400).send({
            success: false,
            error: e.message
        });
    }
};
exports.readCat = readCat;
var createCat = function (req, res) {
    try {
        var data = req.body;
        cats_model_1.Cat.push(data);
        res.status(200).send({
            success: true,
            cats: cats_model_1.Cat
        });
    }
    catch (e) {
        res.status(400).send({
            success: false,
            error: e.message
        });
    }
};
exports.createCat = createCat;
var updateCat = function (req, res) {
    try {
        var id_2 = req.params.id;
        var data = req.body;
        var cat = cats_model_1.Cat.find(function (cat) { return cat.id === id_2; });
        var result = null;
        if (cat) {
            cat = data;
            result = cat;
        }
        res.status(200).send({
            success: true,
            data: {
                result: result
            }
        });
    }
    catch (e) {
        res.status(400).send({
            success: false,
            error: e.message
        });
    }
};
exports.updateCat = updateCat;
var updatePartialCat = function (req, res) {
    try {
        var id_3 = req.params.id;
        var data = req.body;
        var cat = cats_model_1.Cat.find(function (cat) { return cat.id === id_3; });
        var result = null;
        if (cat) {
            cat = __assign(__assign({}, cat), data);
            result = cat;
        }
        res.status(200).send({
            success: true,
            data: {
                result: result
            }
        });
    }
    catch (e) {
        res.status(400).send({
            success: false,
            error: e.message
        });
    }
};
exports.updatePartialCat = updatePartialCat;
var deleteCat = function (req, res) {
    try {
        var id_4 = req.params.id;
        var newCat = cats_model_1.Cat.filter(function (cat) { return cat.id !== id_4; });
        res.status(200).send({
            success: true,
            data: {
                newCat: newCat
            }
        });
    }
    catch (e) {
        res.status(400).send({
            success: false,
            error: e.message
        });
    }
};
exports.deleteCat = deleteCat;
exports.default = router;
//# sourceMappingURL=cats.service.js.map