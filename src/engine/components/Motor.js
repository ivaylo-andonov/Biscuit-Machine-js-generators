import { put, select } from 'redux-saga/effects';
import * as actions from '../../actions'
import { processDelay, shouldResume, componentInProcess, componentOnPause} from '../utils';

export const motorFactory = () => ({
  * trigger() {
    yield put({ type: actions.TRIGGER_MOTOR });
    const pausedComponent = yield select(componentOnPause);
    const currentComponent = yield select(componentInProcess);

    if (shouldResume({ pausedComponent, currentComponent })) {
      yield put({ type: actions.RESUME });
    } else if (!pausedComponent) {
      yield new Promise((resolve) => processDelay(resolve, currentComponent));
    }
  }
})
