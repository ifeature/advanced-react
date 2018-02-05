import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import emailValidator from 'email-validator';
import ErrorField from '../common/ErrorField';

class NewPersonForm extends Component {
    static propTypes = {
        handleSubmit: PropTypes.func.isRequired,
    };

    render() {
        return (
            <div>
                <form onSubmit={this.props.handleSubmit}>
                    <Field name="firstName" component={ErrorField} />
                    <Field name="lastName" component={ErrorField} />
                    <Field name="email" component={ErrorField} />
                    <div>
                        <input type="submit" />
                    </div>
                </form>
            </div>
        );
    }
}

const validate = ({ firstName, lastName, email }) => {
    const errors = {};

    if (!firstName) errors.firstName = 'First name is required';

    if (!lastName) errors.lastName = 'Last name is required';

    if (!email) errors.email = 'Email is required';
    else if (!emailValidator.validate(email)) errors.email = 'Invalid email';

    return errors;
};

export default reduxForm({
    form: 'person',
    validate,
})(NewPersonForm);
