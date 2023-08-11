"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var calculateBmi_1 = require("./calculateBmi");
var body_parser_1 = __importDefault(require("body-parser"));
var exerciseCalculator_1 = __importDefault(require("./exerciseCalculator"));
var app = (0, express_1.default)();
var PORT = 3003;
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.get('/exercises', function (_req, res) {
    res.send('Hello World!');
});
app.post('/exercises', function (req, res) {
    var _a = req.body, daily_exercises = _a.daily_exercises, target = _a.target;
    var result = (0, exerciseCalculator_1.default)(daily_exercises, target);
    res.json(result);
});
app.get('/bmi', function (req, res) {
    var _a = req.query, weight = _a.weight, height = _a.height;
    var weightInt = parseFloat(weight);
    var heightInt = parseFloat(height);
    var bmi = (0, calculateBmi_1.calculateBmi)(weightInt, heightInt);
    if (!weightInt || !heightInt || weightInt <= 0 || heightInt <= 0) {
        res.status(400).json({ error: 'Malformatted parameters' });
        return;
    }
    var response = {
        weight: weight,
        height: height,
        bmi: bmi
    };
    res.json(response);
    console.log(response);
});
app.listen(PORT, function () {
    console.log("Server running at ".concat(PORT));
});
