import { all, call } from 'redux-saga/effects';
import { saga as peopleSaga } from '../ducks/people';
import { saga as authSaga } from '../ducks/auth';
import { saga as eventsSaga } from '../ducks/events';

export default function* rootSaga() {
    yield all([
        call(peopleSaga),
        call(authSaga),
        call(eventsSaga),
    ])
};
