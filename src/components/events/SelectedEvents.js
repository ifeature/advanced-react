import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectedEventsSelector } from '../../ducks/events';
import SelectedEventCard from './SelectedEventCard';

export class SelectedEvents extends Component {
    static propTypes = {

    };

    render() {
        return (
            <div>
                {this.props.events.map(event => <SelectedEventCard event={event} key={event.uid} />)}
            </div>
        );
    }
}

export default connect(state => ({
    events: selectedEventsSelector(state),
}))(SelectedEvents);
