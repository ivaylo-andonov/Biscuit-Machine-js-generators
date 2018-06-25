import { observer } from "mobx-react";
import React from 'react';

export const CommonDeviceView = observer((props) => {
    return (<div>
                <div>{props.deviceName}</div>
                <span>Is In process: {props.isInProcess.get() ? "Process.." : ""} </span>
            </div>
    );
});