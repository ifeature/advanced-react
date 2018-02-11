import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';
import { addEventToPerson, peopleListSelector } from '../../ducks/people';

class EventCard extends Component {
    static propTypes = {
        addEventToPerson: PropTypes.func.isRequired,
    };

    render() {
        const { connectDropTarget, canDrop, hovered, people } = this.props;
        const { title, where, when } = this.props.event;

        const style = {
            border: `1px solid ${canDrop ? 'red' : 'black'}`,
            backgroundColor: hovered ? 'green' : 'white',
        };

        const peopleElement = people && (
            <p>
                {people.map(person => person.email).join(', ')}
            </p>
        );

        return connectDropTarget(
            <div style={style}>
                <h3>{title}</h3>
                <p>{when}, {where}</p>
                {peopleElement}
            </div>
        );
    }
}

const spec = {
    drop(props, monitor) {
        const personUid = monitor.getItem().uid;
        const eventUid = props.event.uid;

        props.addEventToPerson(eventUid, personUid);
        return { eventUid };
    }
};

const collect = (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    canDrop: monitor.canDrop(),
    hovered: monitor.isOver(),
});

export default compose(
    connect((state, props) => ({
        people: peopleListSelector(state).filter(person => person.events.includes(props.event.uid))
    }), { addEventToPerson }),
    DropTarget(['person'], spec, collect)
)(EventCard);