import React from 'react';
import PropTypes from 'prop-types';

export const DeviceView = ({deviceName, processingComponent}) => {
    return (
        <div>
            <hr></hr>
            <h2>{deviceName}</h2>
            <span>{processingComponent === deviceName && <CookieImage />}</span>
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
        src={'https://pngimg.com/uploads/cookie/cookie_PNG13648.png'}
    />
);

DeviceView.propTypes = {
    deviceName: PropTypes.string,
    processingComponent: PropTypes.string
};

TemperatureView.propTypes = {
    temperature: PropTypes.number
};