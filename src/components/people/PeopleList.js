import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { List } from 'react-virtualized';
import { peopleListSelector, fetchAllPeople } from '../../ducks/people';
import PersonCard from './PersonCard';

export class PeopleList extends Component {
    static propTypes = {

    };

    componentDidMount() {
        this.props.fetchAllPeople();
    }

    rowRenderer = ({ index, key, style }) => (
        <PersonCard
            person={this.props.people[index]}
            key={key}
            style={style}
        />
    );

    render() {
        return (
            <List
                rowCount={this.props.people.length}
                rowHeight={100}
                height={300}
                width={200}
                rowRenderer={this.rowRenderer}
            />
        );
    }
}

export default connect(state => ({
    people: peopleListSelector(state),
}), { fetchAllPeople })(PeopleList);

