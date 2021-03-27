import { put } from 'redux-saga/effects';
import { processDelay, shouldResume } from '../utils';

export class Motor {
  * process(store) {
    const machineState = store.getState();
    if (shouldResume(machineState)) {
      yield put({ type: 'RESUME' });
    } else if (!machineState.pausedComponent) {
      yield new Promise((resolve) => processDelay(resolve, machineState.processingComponent));
    }
  }
}
