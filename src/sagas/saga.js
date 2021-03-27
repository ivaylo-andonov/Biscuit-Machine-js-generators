import {
  take, fork, call, cancel, all,
} from 'redux-saga/effects';
import { minBakingTemp, maxBakingTemp } from '../config';
import { biscuitMachineFactory } from '../engine/BiscuitMachine';
import * as actions from '../actions';

const machine = biscuitMachineFactory("The sweetest cookies.");

function* watchWarmUpMachine() {
  while (yield take(actions.WARM_UP)) {
    // starts the task in the background
    const warmUpTask = yield fork(warmUpMachine, machine);
    // wait for the user stop or pause action
    yield take([actions.STOP, actions.PAUSE]);
    // turn off oven's heating
    yield call(machine.oven.turnOff);
    // cancel the background warm up task
    yield cancel(warmUpTask);
  }
}

// warm up machine start
function* warmUpMachine(machine) {
  yield call(machine.oven.warmUp, minBakingTemp, maxBakingTemp);
}

function* watchConveyorStart() {
  while (yield take(actions.START)) {
    // starts the task in the background
    const conveyorStartTask = yield fork(conveyorStart, machine);
    // wait for the user stop or pause action
    yield take([actions.STOP, actions.PAUSE]);
    // cancel the background conveyor task
    yield cancel(conveyorStartTask);
  }
}

// conveyor belt cycle start
function* conveyorStart(machine) {
  const pulse = yield call(machine.motor.trigger);
  yield call(machine.extruder.trigger, pulse);
  yield call(machine.stamper.trigger, pulse);
  yield call(machine.oven.trigger);
  yield call(machine.produceBiscuit);
  yield* conveyorStart(machine);
}

export default function* rootSaga() {
  yield all([
    fork(watchWarmUpMachine),
    fork(watchConveyorStart),
  ]);
}
