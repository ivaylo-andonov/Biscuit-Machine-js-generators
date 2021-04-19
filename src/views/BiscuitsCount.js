import React from 'react';
import PropTypes from 'prop-types';

export const BiscuitsCount = ({ biscuitsCount }) =>
    <div>
        <h2>Biscuits Count:</h2>
        <h2>{biscuitsCount}</h2>
    </div>

BiscuitsCount.propTypes = {
    onStart: PropTypes.func,
    onStop: PropTypes.func,
    onPause: PropTypes.func,
    biscuitsCount: PropTypes.number
};