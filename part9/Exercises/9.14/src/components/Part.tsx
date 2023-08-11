import React from 'react';
import { CoursePart } from './Types';

type PartProps = {
    part: CoursePart
};

const Part = ({ part }: PartProps) => {
    switch (part.kind) {
        case "basic":
            return (
                <div>
                    <h3>{part.name} {part.exerciseCount}</h3>

                    <p>{part.description}</p>
                </div>
            );
        case "group":
            return (
                <div>
                    <h3>{part.name} {part.exerciseCount}</h3>
                    <p>Group projects: {part.groupProjectCount}</p>

                </div>
            );
        case "background":
            return (
                <div>

                    <h3>{part.name} {part.exerciseCount}</h3>
                    <p>{part.backgroundMaterial}</p>
                    <p>{part.description}</p>


                </div>
            );
        case "special":
            return (
                <div>

                    <h3>{part.name} {part.exerciseCount}</h3>
                    <p>{part.description}</p>
                    <p>Requirements: {part.requirements.join(', ')}</p>
                </div>
            );
        default:
            return null;
    }
};

export default Part;