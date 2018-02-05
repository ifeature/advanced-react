import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Unauthorized from './Unauthorized';
import { moduleName } from '../../ducks/auth';

class ProtectedRoute extends Component {
    static propTypes = {

    };

    renderProtected = (routeProps) => {
        const { component: ProtectedComponent, authorized } = this.props;
        return authorized ? <ProtectedComponent {...routeProps } /> : <Unauthorized />;
    };

    render() {
        const { component, ...rest } = this.props;
        return (
            <Route {...rest } render={this.renderProtected} />
        );
    }
}

export default connect(state => ({
    authorized: !!state[moduleName].user,
}), null, null, { pure: false })(ProtectedRoute);