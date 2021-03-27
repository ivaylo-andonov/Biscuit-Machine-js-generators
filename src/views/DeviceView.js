import React from 'react';
import PropTypes from 'prop-types';

export const DeviceView = (props) => {
    return (
        <div>
            <hr></hr>
            <h2>{props.deviceName}</h2>
            <span>{props.processingComponent === props.deviceName && <Image />}</span>
            <hr></hr>
        </div>
    );
};

export const TemperatureView = (props) => {
    return (
        <div>
            <b>Temperature:</b>
            <span>{props.temperature || 0}</span>
            <hr></hr>
        </div>
    );
};

const Image = () => (
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