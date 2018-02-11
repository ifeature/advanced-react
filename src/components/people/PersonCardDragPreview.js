import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { personSelector } from '../../ducks/people';

class PersonCardDragPreview extends Component {
    static propTypes = {

    };

    render() {
        return (
            <h1>{this.props.person.firstName}</h1>
        );
    }
}

export default connect((state, props) => ({
    person: personSelector(state, props),
}))(PersonCardDragPreview);
