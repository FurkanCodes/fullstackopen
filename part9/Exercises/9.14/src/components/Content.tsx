import React from 'react';
import Part from './Part';
import { CoursePart } from './Types';

type ContentProps = {
    courseParts: CoursePart[];
};

const Content = ({ courseParts }: ContentProps) => {
    return (
        <div>
            {courseParts.map((part, index) => (
                <Part key={index} part={part} />
            ))}
        </div>
    );
};

export default Content;