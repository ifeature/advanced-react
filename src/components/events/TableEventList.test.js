import React from 'react';
import { shallow, mount } from 'enzyme';
import { EventList } from './TableEventList';
import { EventRecord } from '../../ducks/events';
import Loader from '../common/Loader';
import events from '../../mocks/conferences';

const testEvents = events.map(event => new EventRecord({ ...event, uid: Math.random().toString() }));

test('should render loader', () => {
    const container = shallow(
        <EventList
            loading={true}
            fetchAll={jest.fn()}
        />
    );

    expect(container.contains(<Loader />));
});

test('should render event list', () => {
    const container = shallow(
        <EventList
            events={testEvents}
            loading={false}
            fetchAll={jest.fn()}
        />
    );

    const rows = container.find('.test--event-list__row');

    expect(rows.length).toBe(testEvents.length);
});

test('should request fetch data', (done) => {
    mount(
        <EventList
            events={[]}
            fetchAll={done}
        />
    );
});

test('should select event', () => {
    let selected = null;
    const selectEvent = uid => selected = uid;

    const container = mount(
        <EventList
            events={testEvents}
            fetchAll={jest.fn()}
            selectEvent={selectEvent}
        />
    );

    container.find('.test--event-list__row').first().simulate('click', { preventDefault: jest.fn() });

    expect(selected).toEqual(testEvents[0].uid);
});