import React from 'react';
import PropTypes from 'prop-types';

export const BiscuitsView = (props) => {
    return (<div>
        <h2>Biscuits Count:</h2>
        <h2>{props.biscuitsCount}</h2>
    </div>);
};

BiscuitsView.propTypes = {
    onStart: PropTypes.func,
    onStop: PropTypes.func,
    onPause: PropTypes.func,
    biscuitsCount: PropTypes.number
};