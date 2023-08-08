"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var parseArgumentsExercises = function (args) {
    if (args.length < 4)
        throw new Error('Not enough arguments');
    var inputs = args.slice(2);
    var numberedInputs = inputs.map(function (input) {
        if (isNaN(Number(input))) {
            throw new Error('Provided values were not numbers!');
        }
        return Number(input);
    });
    return {
        targetExerciseHours: Number(args[2]),
        dailyExerciseHours: numberedInputs.slice(1)
    };
};
var ratingDescriptionList = [
    'just the worst',
    'not too bad but could be better',
    'perfect'
];
var calculateExercise = function (exerciseTimes, target) {
    var periodLength = exerciseTimes.length;
    var trainingDays = exerciseTimes.filter(function (e) { return e > 0; }).length;
    var success = exerciseTimes.every(function (e) { return e >= target; });
    var successDays = exerciseTimes.filter(function (e) { return e >= target; }).length;
    var average = exerciseTimes.reduce(function (a, b) { return a + b; }) / periodLength;
    var rating;
    if (successDays === periodLength)
        rating = 3;
    else if (successDays >= periodLength / 2)
        rating = 2;
    else
        rating = 1;
    var ratingDescription = ratingDescriptionList[rating - 1];
    return {
        periodLength: periodLength,
        trainingDays: trainingDays,
        success: success,
        target: target,
        rating: rating,
        ratingDescription: ratingDescription,
        average: average
    };
};
if (require.main === module) {
    try {
        var _a = parseArgumentsExercises(process.argv), targetExerciseHours = _a.targetExerciseHours, dailyExerciseHours = _a.dailyExerciseHours;
        console.log(calculateExercise(dailyExerciseHours, targetExerciseHours));
    }
    catch (e) {
        var error = Error(e);
        console.log('Error, something bad happened ', error.message);
    }
}
exports.default = calculateExercise;
