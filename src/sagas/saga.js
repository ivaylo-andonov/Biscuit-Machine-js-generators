import { put, take, fork, call, cancel, all } from "redux-saga/effects";
import { biscuitMachineFactory } from '../engine/BiscuitMachine';
import * as actions from '../actions'
import { store } from '..';

const machine = biscuitMachineFactory();

function* watchWarmUp() {
  while (yield take(actions.WARM_UP)) {
    // starts the task in the background
    const warmUpTask = yield fork(warmUp, machine)
    // wait for the user stop or pause action
    yield take([actions.STOP, actions.PAUSE])
    yield call(machine.oven.turnOff, store)
    // cancel the background task
    yield cancel(warmUpTask)
  }
}

function* watchConveyorStart() {
  while (yield take(actions.START)) {
    // starts the task in the background
    const conveyorStartTask = yield fork(conveyorStart, machine)
    // wait for the user stop or pause action
    yield take([actions.STOP, actions.PAUSE])
    // cancel the background task
    yield cancel(conveyorStartTask)
  }
}

function* warmUp(machine) {
  yield call(machine.oven.warmUp, store);
}

function* conveyorStart(machine) {
  yield put({ type: actions.TRIGGER_MOTOR });
  yield call(machine.motor.process, store)
  yield put({ type: actions.TRIGGER_EXTRUDER });
  yield call(machine.extruder.process, store);
  yield put({ type: actions.TRIGGER_STAMPER });
  yield call(machine.stamper.process, store);
  yield put({ type: actions.TRIGGER_OVEN });
  yield call(machine.oven.process, store);
  yield put({ type: actions.PRODUCE_COOKIE });
  yield call(machine.produceBiscuit, store);
  yield* conveyorStart(machine);
}

export default function* rootSaga() {
  yield all([
    fork(watchWarmUp),
    fork(watchConveyorStart)
  ])
}

