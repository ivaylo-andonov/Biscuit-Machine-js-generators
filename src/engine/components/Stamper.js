import { put } from '@redux-saga/core/effects';
import { shouldResume, processDelay } from '../utils';

export class Stamper {
  * process(store) {
    const machineState = store.getState();
    if (shouldResume(machineState)) {
      yield put({ type: 'RESUME' });
    } else if (!machineState.pausedComponent) {
      yield new Promise((resolve) => processDelay(resolve, machineState.processingComponent));
    }
  }
}
