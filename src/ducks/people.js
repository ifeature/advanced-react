import { Record, List } from 'immutable';
import { put, call, takeEvery } from 'redux-saga/effects';
import { appName } from '../config';
import { generateId } from './utils';

const ReducerState = Record({
    entries: new List([]),
});

const PersonRecord = Record({
    id: null,
    firstName: null,
    lastName: null,
    email: null,
});

export const moduleName = 'people';
export const prefix = `${appName}/${moduleName}`;
export const ADD_PERSON_REQUEST = `${prefix}/ADD_PERSON_REQUEST`;
export const ADD_PERSON = `${prefix}/ADD_PERSON`;

export default function reducer(state = new ReducerState(), { type, payload }) {
    switch (type) {
        case ADD_PERSON:
            return state.update('entries', entries => entries.push(new PersonRecord(payload)));
        default:
            return state;
    }
}

export function addPerson(person) {
    return {
        type: ADD_PERSON_REQUEST,
        payload: person,
    };
}

export const addPersonSaga = function* (action) {
  const id = yield call(generateId);
  yield put({
      type: ADD_PERSON,
      payload: { id, ...action.payload }
  });
};

export const saga = function* () {
    yield takeEvery(ADD_PERSON_REQUEST, addPersonSaga);
};