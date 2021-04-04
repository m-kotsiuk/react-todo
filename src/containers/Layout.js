import React from 'react';

const Lists = props => {
    return (
        <div>
            This is Layout
            <div>{ props.children }</div>
        </div>
    );
};

export default Lists;