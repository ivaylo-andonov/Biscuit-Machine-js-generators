import React from 'react';

export const BiscuitsView = (props) => {
    return (<div>
        <h2>Biscuits Count:</h2>
        <span>{props.biscuitsCount}</span>
    </div>);
};