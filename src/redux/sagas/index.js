import { fork } from 'redux-saga/effects';
import * as auth from './user/auth';

export default function* rootSaga() {
  yield fork(auth.loginFlow);
}
