import React, { Component } from 'react';
import PeopleList from '../people/PeopleList';
import EventList from '../events/VirtualizedEventList';
import SelectedEvents from '../events/SelectedEvents';

class AdminPage extends Component {
    render() {
        return (
            <div>
                <h1>Admin Page</h1>
                <PeopleList />
                <SelectedEvents/>
                <EventList />
            </div>
        );
    }
}

export default AdminPage;
