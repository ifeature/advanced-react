import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { moduleName, addPerson } from '../../ducks/people';
import NewPersonForm from '../people/NewPersonForm';
import PeopleList from '../people/PeopleTable';
import Loader from '../common/Loader';

class PeoplePage extends Component {
    static propTypes = {
        addPerson: PropTypes.func.isRequired,
    };

    render() {
        const { loading, addPerson } = this.props;

        return (
            <div>
                <h2>Add new person</h2>
                <PeopleList />
                {loading
                    ? <Loader/>
                    : <NewPersonForm onSubmit={addPerson} />
                }
            </div>
        );
    }
}

export default connect(state => ({
    loading: state[moduleName].loading
}), { addPerson })(PeoplePage);
