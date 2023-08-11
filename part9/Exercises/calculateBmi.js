"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateBmi = void 0;
// #BMI is defined as the body mass divided by the square of the body height,
var calculateBmi = function (height, weight) {
    var heightInCm = height / 10000;
    var index = weight / (heightInCm * height);
    if (index < 25) {
        return "Abnormal (unhealthy weight)";
    }
    else if (index > 25) {
        return "Normal (healthy weight)";
    }
    return;
};
exports.calculateBmi = calculateBmi;
// const height: number = Number(process.argv[2])
// const weight: number = Number(process.argv[3])
console.log((0, exports.calculateBmi)(180, 74));
