import { put, take, fork, call, cancel } from "redux-saga/effects";
import * as Devices from '../engine/components';
import { BiscuitMachine } from '../engine/BiscuitMachine';
import { store } from '../'

function* conveyorStart(machine) {
  yield put({ type: "MOTOR" });
  yield call(machine.motor.process, store.getState())
  yield put({ type: "EXTRUDER" });
  yield call(machine.extruder.process, store.getState());
  yield put({ type: "STAMPER" });
  yield call(machine.stamper.process, store.getState());
  yield call(machine.produceBiscuit, store);
  yield put({ type: "OVEN" });
  // yield call(machine.oven.process, store);
  // yield call(machine.oven.turnOn, store);
  yield* conveyorStart(machine);
}

export const constructBiscuitMachine = () => {
  return new BiscuitMachine.Builder("Machine for the sweetest biscuits")
    .withMotor(new Devices.Motor())
    .withExtruder(new Devices.Extruder())
    .withStamper(new Devices.Stamper())
    .withOven(new Devices.Oven())
    .build();
}

const machine = constructBiscuitMachine();

export function* watchConveyorStart() {
  while (yield take('START')) {
    // starts the task in the background
    const bgSyncTask = yield fork(conveyorStart, machine)
    // wait for the user stop or pause action
    yield take(['STOP', 'PAUSE'])
    // cancel the background task
    yield cancel(bgSyncTask)
  }
}


