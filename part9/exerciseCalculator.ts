interface InputExercises {
    targetExerciseHours: number;
    dailyExerciseHours: Array<number>;
}

const parseArgumentsExercises = (args: Array<string>): InputExercises => {
    if (args.length < 4) throw new Error('Not enough arguments');

    const inputs = args.slice(2);

    const numberedInputs = inputs.map(input => {
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



interface ExerciseArray {
    periodLength: number
    trainingDays: number
    success: boolean
    rating: number
    ratingDescription: string
    target: number
    average: number
}

const ratingDescriptionList = [
    'just the worst',
    'not too bad but could be better',
    'perfect'
];

const calculateExercise = (exerciseTimes: Array<number>, target: number): ExerciseArray => {
    const periodLength = exerciseTimes.length;
    const trainingDays = exerciseTimes.filter(e => e > 0).length;
    const success = exerciseTimes.every(e => e >= target);
    const successDays = exerciseTimes.filter(e => e >= target).length;
    const average = exerciseTimes.reduce((a, b) => a + b) / periodLength;

    let rating;
    if (successDays === periodLength)
        rating = 3;
    else if (successDays >= periodLength / 2)
        rating = 2;
    else
        rating = 1;

    const ratingDescription = ratingDescriptionList[rating - 1];

    return {
        periodLength,
        trainingDays,
        success,
        target,
        rating,
        ratingDescription,
        average
    };
};



if (require.main === module) {
    try {
        const { targetExerciseHours, dailyExerciseHours } = parseArgumentsExercises(process.argv);
        console.log(calculateExercise(dailyExerciseHours, targetExerciseHours));
    } catch (e) {
        const error: Error = Error(e);
        console.log('Error, something bad happened ', error.message);
    }
}

export default calculateExercise;