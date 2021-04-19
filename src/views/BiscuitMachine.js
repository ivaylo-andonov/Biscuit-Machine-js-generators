import React from 'react';
import PropTypes from 'prop-types';

export const BiscuitMachine = ({ children }) =>
    <div className="biscuit-machine-container">
        <h1>Biscuit Machine</h1>
        {children}
    </div>

BiscuitMachine.propTypes = {
    children: PropTypes.any
};