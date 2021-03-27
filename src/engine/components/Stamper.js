import { Component } from 'react';
import { put } from '@redux-saga/core/effects';
import { shouldResume } from '../utils';

export class Stamper extends Component {
  * process(store) {
    const machineState = store.getState();
    if (shouldResume(machineState)) {
      yield put({ type: 'RESUME' });
    } else if (!machineState.pausedComponent) {
      yield new Promise((resolve) => {
        setTimeout(() => {
          console.log(`${machineState.processingComponent} processed the biscuit successfully`);
          resolve('pulse');
        }, 1000);
      });
    }
  }
}
