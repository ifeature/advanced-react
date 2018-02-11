import { call, put } from 'redux-saga/effects';
import { addPersonSaga, ADD_PERSON_REQUEST, ADD_PERSON_SUCCESS } from './people';
import { generateId } from './utils';

test.skip('should dispatch person with id', () => {
    const person = {
        firstName: 'Roman',
        email: 'test@example.com',
    };

    const saga = addPersonSaga({
        type: ADD_PERSON_REQUEST,
        payload: person,
    });

    expect(saga.next().value).toEqual(call(generateId));

    const id = 123456789;

    expect(saga.next(id).value).toEqual(put({
        type: ADD_PERSON_SUCCESS,
        payload: { id, ...person },
    }));
});