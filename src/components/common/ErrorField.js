import React from 'react';

function ErrorField({ input, meta: { error, touched }, type }) {
    const errorText = touched && error && <div style={{ color: 'red'}}>{error}</div>;
    return (
        <div>
            <label>{input.name}</label>
            <input {...input} type={type} />
            {errorText}
        </div>
    );
}

export default ErrorField;
