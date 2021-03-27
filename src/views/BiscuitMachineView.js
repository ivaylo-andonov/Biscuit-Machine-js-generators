import React from 'react';
import PropTypes from 'prop-types';

export const BiscuitMachineView = ({ children }) => {
    return (
        <div className="biscuit-machine-container">
            <h1>Biscuit Machine</h1>
            {children}
        </div>);
};

BiscuitMachineView.propTypes = {
    children: PropTypes.any
};