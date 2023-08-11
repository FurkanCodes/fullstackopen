interface ExerciseArray {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}
declare const calculateExercise: (exerciseTimes: Array<number>, target: number) => ExerciseArray;
export default calculateExercise;
