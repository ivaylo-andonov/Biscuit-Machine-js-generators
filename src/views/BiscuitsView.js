import { observer } from "mobx-react";
import React from 'react';

export const BiscuitsView = observer((props) => {
    return (<div>
        <h2>Biscuits Count:</h2>
        <span>{props.biscuits.val}</span>
    </div>);
});