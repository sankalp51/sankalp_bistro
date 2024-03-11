import React from 'react';

const Error = ({ title, message }) => {
    return (
        <div className="error-container">
            <h2 className="error-title">{title}</h2>
            <p className="error-message">{message}</p>
        </div>
    );
};

export default Error;
