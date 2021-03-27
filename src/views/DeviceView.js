import React from 'react';
import PropTypes from 'prop-types';

export const DeviceView = ({deviceName, currentComponent}) => {
    return (
        <div>
            <hr></hr>
            <h2>{deviceName}</h2>
            <span>{currentComponent === deviceName && <CookieImage />}</span>
            <hr></hr>
        </div>
    );
};

export const TemperatureView = ({temperature}) => {
    return (
        <div>
            <b>Temperature:</b>
            <span>{temperature || 0}</span>
            <hr></hr>
        </div>
    );
};

const CookieImage = () => (
    <img
        style={{ width: '20px', height: '20px' }}
        src={'../../cookie.png'}
    />
);

DeviceView.propTypes = {
    deviceName: PropTypes.string,
    currentComponent: PropTypes.string
};

TemperatureView.propTypes = {
    temperature: PropTypes.number
};