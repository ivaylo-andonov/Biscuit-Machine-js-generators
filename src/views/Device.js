import React from 'react';
import PropTypes from 'prop-types';

export const Device = ({ deviceName, currentComponent }) =>
    <div>
        <hr></hr>
        <h2>{deviceName}</h2>
        <span>{currentComponent === deviceName && <CookieImage />}</span>
        <hr></hr>
    </div>

export const Temperature = ({ temperature }) =>
    <div>
        <b>Temperature:</b>
        <span>{temperature || 0}</span>
        <hr></hr>
    </div>

export const CookieImage = () => (
    <img
        style={{ width: '20px', height: '20px' }}
        src={'../../cookie.png'}
    />
);

Device.propTypes = {
    deviceName: PropTypes.string,
    currentComponent: PropTypes.string
};

Temperature.propTypes = {
    temperature: PropTypes.number
};