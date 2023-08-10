import React from "react";

interface Content {
    name: string,
    exerciseCount: number
}

interface ContentProps {
    content: Content[];
}
const Content = ({ content }: ContentProps) => {
    return <div>
        {content.map((c, index) => (
            <p key={index}>
                {c.name} {c.exerciseCount}
            </p>
        ))}
    </div>
};

export default Content;