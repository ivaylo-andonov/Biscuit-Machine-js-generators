import { put, select } from 'redux-saga/effects';
import { shouldResume, processDelay, componentOnPause, componentInProcess } from '../utils';
import * as actions from '../../actions'

export const extruderFactory = () => ({
  * trigger() {
    yield put({ type: actions.TRIGGER_EXTRUDER });
    const pausedComponent = yield select(componentOnPause);
    const currentComponent = yield select(componentInProcess);

    if (shouldResume({ pausedComponent, currentComponent })) {
      yield put({ type: actions.RESUME });
    } else if (!pausedComponent) {
      yield new Promise((resolve) => processDelay(resolve, currentComponent));
    }
  }
})
