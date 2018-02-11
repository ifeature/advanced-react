import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Link } from 'react-router-dom';
import AdminPage from './routes/AdminPage';
import AuthPage from './routes/AuthPage';
import EventsPage from './routes/EventsPage';
import PeoplePage from './routes/PeoplePage';
import ProtectedRoute from './common/ProtectedRoute';
import { moduleName, signOut } from '../ducks/auth';
import CustomDragLayer from '../CustomDragLayer';

class Root extends Component {
    static propTypes = {
        signedIn: PropTypes.bool.isRequired,
        signOut: PropTypes.func.isRequired,
    };

    render() {
        const { signedIn, signOut } = this.props;
        const btn = signedIn
            ? <button onClick={signOut}>Sign Out</button>
            : <Link to="/auth/signin">Sign In</Link>
        return(
            <div>
                {btn}
                <ProtectedRoute path="/admin" component={AdminPage} />
                <ProtectedRoute path="/people" component={PeoplePage} />
                <ProtectedRoute path="/events" component={EventsPage} />
                <Route path="/auth" component={AuthPage} />
                <CustomDragLayer />
            </div>
        );
    }
}

export default connect(state => ({
    signedIn: !!state[moduleName].user,
}), { signOut }, null, { pure: false })(Root);