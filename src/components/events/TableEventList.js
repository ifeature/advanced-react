import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
    moduleName,
    fetchAll,
    selectEvent,
    eventListSelector
} from '../../ducks/events';
import Loader from '../common/Loader';

export class EventList extends Component {
    static propTypes = {
        loading: PropTypes.bool.isRequired,
        fetchAll: PropTypes.func.isRequired,
        selectEvent: PropTypes.func.isRequired,
    };

    componentDidMount() {
        this.props.fetchAll();
    }

    getRows = () => this.props.events.map(this.getRow);

    getRow = (event) => (
        <tr
            key={event.uid}
            className="test--event-list__row"
            onClick={this.handleRowClick(event.uid)}
        >
            <td>{event.title}</td>
            <td>{event.where}</td>
            <td>{event.month}</td>
        </tr>
    );

    handleRowClick = uid => () => {
        this.props.selectEvent(uid);
    };

    render() {
        if (this.props.loading) return <Loader />;
        return (
            <div>
                <table>
                    <tbody>{this.getRows()}</tbody>
                </table>
            </div>
        );
    }
}

export default connect(state => ({
    events: eventListSelector(state),
    loading: state[moduleName].loading,
}), { fetchAll, selectEvent })(EventList);
