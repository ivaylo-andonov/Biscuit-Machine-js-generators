import React from 'react';

export const DeviceView = (props) => {
    return (
        <div>
            <hr></hr>
            <b>{props.deviceName}</b>
            <span>{props.processingComponent === props.deviceName && <Image />}</span>
            <hr></hr>
        </div>
    );
};

export const TemperatureView = (props) => {
    return (
        <div>
            <b>Temperature:</b>
            <span>{props.temperature || 0} </span>
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