import React from 'react';
import { mount } from 'enzyme';
import { PeopleTable } from './PeopleTable';

function generateList(length) {
    const arr = [];

    for(let i = 0; i < length; i++) {
        arr.push({
            firstName: Math.random().toString(),
            lastName: Math.random().toString(),
            email: Math.random().toString(),
        });
    }

    return arr;
}

test('should render all items from short list', () => {
    const shortList = generateList(5);

    const container = mount(<PeopleTable people={shortList} />);
    const rows = container.find('.test--people-list__row');

    expect(rows.length).toBe(shortList.length + 1);
});

test('should render all items from long list', () => {
    const longList = generateList(200);

    const container = mount(<PeopleTable people={longList} />);
    const rows = container.find('.test--people-list__row');

    expect(rows.length).toBe(10);
});

test('should request fetching', (done) => {
    mount(<PeopleTable people={[]} fetchAllPeople={done} />);
});