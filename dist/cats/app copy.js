"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var cats_model_1 = require("./cats/cats.model");
var express_1 = require("express");
var router = express_1.Router();
router.use(function (req, res, next) {
    console.log('logging middleware');
    console.log(req.rawHeaders[1]);
    next();
});
router.use(express.json());
router.get('/', function (req, res) {
    res.send({ cats: cats_model_1.Cat });
});
router.get('/cats', function (req, res) {
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
});
router.get('/cats/:id', function (req, res) {
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
});
router.post('/cats', function (req, res) {
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
});
exports.default = router;
//# sourceMappingURL=app%20copy.js.map