import { all, fork } from 'redux-saga/effects';
import ExampleSaga from './example.saga';
import ExampleSaga2 from './example2.saga';

function* rootSaga() {
  yield all([fork(ExampleSaga)]);
  yield all([fork(ExampleSaga2)]);
}

export default rootSaga;
