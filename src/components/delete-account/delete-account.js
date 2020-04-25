import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMask } from '@fortawesome/free-solid-svg-icons';
import { deleteUser } from '../../actions/user-actions';

class DeleteAccount extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            submitting: false,
            error: null
        };
    }

    componentDidMount() {
        window.scrollTo(0, 0);
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({
            submitting: true
        });

        var token = localStorage.getItem('token');
        var userId = localStorage.getItem('userId');

        deleteUser(userId, token)
            .then(() => {
                this.handleSuccess();
            })
            .catch(error => {
                this.handleError(error);
            })
    }

    handleSuccess = () => {
        this.setState({
            submitting: false
        });
        this.props.history.push('/');
    }

    handleError = (error) => {
        this.setState({
            error: error,
            submitting: false
        });
    }

    render() {
        return (
            <div className="column is-8 is-offset-2 form-container"> 
                <div className="card custom-card">
                    <div className="card-content">
                        <div className="media">
                            <div className="image-header-container">
                                <FontAwesomeIcon icon={faMask} className="mask-icon" size="lg"/>
                            </div>
                        </div>
                        {
                            this.state.error && 
                            <div className="notification is-danger">{this.state.error}</div>
                        }
                        <div className="has-text-centered">
                            <div>
                                <p>Are you sure you want to delete your account?</p>
                                <p><b>All data will be unrecoverable once the operation is complete.</b></p>
                            </div>
                            <div style={{'marginTop': '20px'}}>
                                <button onClick={this.handleSubmit} className={this.state.submitting ? "button is-danger is-loading" : "button is-danger"}>
                                    Confirm
                                </button>
                                <Link to="/my-account" className="button cancel-button">
                                    Cancel
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(DeleteAccount);