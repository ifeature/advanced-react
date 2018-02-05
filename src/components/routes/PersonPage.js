import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPerson } from '../../ducks/people';
import NewPersonForm from '../people/NewPersonForm';

class PersonPage extends Component {
    static propTypes = {
        addPerson: PropTypes.func.isRequired,
    };

    render() {
        return (
            <div>
                <h2>Add new person</h2>
                <NewPersonForm onSubmit={this.props.addPerson} />
            </div>
        );
    }
}

export default connect(null, { addPerson })(PersonPage);
