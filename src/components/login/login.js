import React, { Component } from 'react';
import './login.css';
import { connect } from 'react-redux';
import { fetchToken } from '../../actions/userActions';
import { withRouter } from 'react-router-dom';
import { Formik } from 'formik';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            submitting: false
        };
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if(nextProps.token && nextProps.user) {
            this.setState({ submitting: false });
            this.props.history.push('/');
        }
    }

    login(values) {
        this.setState({ submitting: true });
        var login = { Username: values.email, Password: values.password };
        this.props.fetchToken(login);
    }

    render() {
        return (
            <div className="login-container">
                <section className="hero is-fullheight">
                    <div className="hero-body">
                        <div className="container has-text-centered">
                            <div className="column is-4 is-offset-4">
                                <h3 className="title has-text-black">Login</h3>
                                <hr className="login-hr" />
                                <p className="subtitle has-text-black">Please login to proceed.</p>
                                <div className="box">
                                    <figure className="avatar">
                                        <img src="https://placehold.it/128x128" alt="Login icon" />
                                    </figure>
                                    <Formik
                                    initialValues=
                                    {
                                        {
                                            email: '',
                                            password: '',
                                            rememberMe: true
                                        }
                                    }
                                    validate={values => {
                                        let errors = {};
                                        if (!values.email)
                                            errors.email = 'Required';
                                        if(!values.password)
                                            errors.password = 'Required';
                                        return errors;
                                    }}
                                    onSubmit={(values, { setSubmitting }) => {
                                        this.login(values);
                                        setSubmitting(false);
                                    }}>{({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
                                        <form className="form" onSubmit={handleSubmit}>
                                            <div className="field">
                                                <label className="label">Email</label>
                                                <div className="control">
                                                    <input className={errors.email && touched.email ? 'input is-large is-danger' : 'input is-large'} type="text" name="email" placeholder="Enter email..." onChange={handleChange} onBlur={handleBlur} value={values.email} />
                                                </div>
                                            </div>
                                            <div className="field">
                                                <label className="label">Password</label>
                                                <div className="control">
                                                    <input className={errors.password && touched.password ? 'input is-large is-danger' : 'input is-large'} type="password" name="password" placeholder="Enter password..." onChange={handleChange} onBlur={handleBlur} value={values.password} />
                                                </div>
                                            </div>
                                            {/* <div className="field">
                                                <label className="checkbox">
                                                <input type="checkbox" name="rememberMe" checked={values.rememberMe} value={values.rememberMe} onChange={handleChange} />
                                                    Remember me
                                                </label>
                                            </div> */}
                                            <button className={this.state.submitting ? "button is-block is-info is-large is-fullwidth is-loading" : "button is-block is-info is-large is-fullwidth"} type="submit" disabled={isSubmitting}>
                                                Login <i className="fa fa-sign-in" aria-hidden="true"></i>
                                            </button>
                                        </form>
                                    )}
                                    </Formik>
                                </div>
                                <p className="has-text-grey">
                                    <a href="/register">Sign Up</a> &nbsp;·&nbsp;
                                    <a href="../">Forgot Password</a> &nbsp;·&nbsp;
                                    <a href="../">Need Help?</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    token: state.user.token,
    user: state.user.user
});

export default connect(mapStateToProps, {fetchToken})(withRouter(Login));