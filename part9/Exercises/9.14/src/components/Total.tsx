import React from "react";


interface Content {
    name: string;
    exerciseCount: number;
}
interface Total {
    content: Content[]
}

const Total = ({ content }: Total) => {
    const totalExercises = content.reduce(
        (total, part) => total + part.exerciseCount,
        0
    );

    return <p>Number of exercises {totalExercises}</p>;
}

export default Total;