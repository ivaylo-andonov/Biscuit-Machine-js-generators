import { observer } from "mobx-react";
import React from 'react';

export const DeviceView = observer((props) => {
    return (<div>
        <b>{props.deviceName}</b>
        <span>{props.temperature && props.temperature.val} </span>
        <span>{props.isInProcess.get() ? "Process.." : ""}</span>
        <hr></hr>
    </div>
    );
});