"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var app_model_1 = require("./app.model");
var app = express();
var port = 8000;
app.use(function (req, res, next) {
    console.log('logging middleware');
    console.log(req.rawHeaders[1]);
    next();
});
app.use(express.json());
app.get('/', function (req, res) {
    res.send({ cats: app_model_1.Cat });
});
app.get('/cats', function (req, res) {
    try {
        var cats = app_model_1.Cat;
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
app.get('/cats/:id', function (req, res) {
    try {
        var id_1 = req.params.id;
        var cat = app_model_1.Cat.find(function (cat) { return cat.id === id_1; });
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
app.post('/cats', function (req, res) {
    try {
        var data = req.body;
        app_model_1.Cat.push(data);
        res.status(200).send({
            success: true,
            cats: app_model_1.Cat
        });
    }
    catch (e) {
        res.status(400).send({
            success: false,
            error: e.message
        });
    }
});
app.use(function (req, res) {
    console.log('error middleware');
    res.send({ error: '404 not found' });
});
app.listen(port, function () {
    console.log("Example app listening on port " + port);
});
//# sourceMappingURL=app.js.map