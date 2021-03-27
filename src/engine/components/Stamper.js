import { put, select } from 'redux-saga/effects';
import * as actions from '../../actions'
import { shouldResume, processDelay, componentOnPause, componentInProcess } from '../utils';

export const stamperFactory = () => ({
  * trigger() {
    yield put({ type: actions.TRIGGER_STAMPER });
    const pausedComponent = yield select(componentOnPause);
    const currentComponent = yield select(componentInProcess);

    if (shouldResume({ pausedComponent, currentComponent })) {
      yield put({ type: actions.RESUME });
    } else if (!pausedComponent) {
      yield new Promise((resolve) => processDelay(resolve, currentComponent));
    }
  }
})
