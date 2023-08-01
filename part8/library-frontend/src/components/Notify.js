import React, { useEffect } from 'react';

function Notify({ error, onClose }) {
    useEffect(() => {
        const timer = setTimeout(() => {
            // Call the onClose callback to clear the error after 4 seconds
            onClose();
        }, 4000);

        return () => {
            clearTimeout(timer);
        };
    }, [error, onClose]);

    // Show the error only when the error prop is not null
    return <div>{error && <p>{error}</p>}</div>;
}

export default Notify;