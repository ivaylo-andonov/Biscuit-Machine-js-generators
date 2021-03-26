import React from 'react';

const DeviceView = (props) => {
    return (<div>
        <b>{props.deviceName}</b>
        <span>{props.temperature || ""} </span>
        <span>{props.processingComponent === props.deviceName ? "Process..." : ""}</span>
        <hr></hr>
    </div>
    );
};

export default DeviceView