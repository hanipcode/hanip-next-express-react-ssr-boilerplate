import React from 'react';
import { toast, ToastContainer } from 'react-toastify';
import Router, { withRouter } from 'next/router';
import { connect } from 'react-redux';
import Navbar from '../layout/Navbar';

import 'react-toastify/dist/ReactToastify.css';

import '../styles/register.scss';
import Loading from '../layout/Loading';
import { registerUser, loginUser } from '../client/services/user';
import { getUserDataState, getUserAccessTokenState, userLoginState } from '../client/ducks/user';


interface RegisterProps {
  user: any;
  accessToken: string;
  initLoginState(user: any, accessToken: string): any;
}

type RegisterState = {
  firstName: string,
  lastName: string,
  email: string,
  phoneNumber: string,
  password: string,
  passwordConfirmation: string,
  isLoading: boolean,
};

class Register extends React.Component<RegisterProps, RegisterState> {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      password: '',
      passwordConfirmation: '',
      isLoading: false,
    };
  }

  onSubmit(e) {
    e.preventDefault();
    const validationError = this.validateForm();

    if (validationError.isError) {
      toast(validationError.message, {
        position: 'bottom-center',
        hideProgressBar: true,
      });
      return;
    }

    this.setState({ isLoading: true });
    const {
      password, phoneNumber, firstName, lastName, email,
    } = this.state;
    registerUser(firstName, lastName, phoneNumber, email, password).then((response) => {
      this.setState({ isLoading: false });
      if (response.error) {
        toast(response.message, {
          type: 'error',
          position: 'bottom-center',
          hideProgressBar: true,
        });
        return;
      }
      toast('Berhasil Mendaftar, Mengalihkan Anda', {
        type: 'success',
        position: 'bottom-center',
        hideProgressBar: true,
      });
      this.setState({ isLoading: true });
      loginUser(email, password).then((loginResponse) => {
        this.setState({ isLoading: false });
        const { initLoginState } = this.props;
        if (loginResponse.error) {
          toast(loginResponse.message, {
            type: 'error',
            position: 'bottom-center',
            hideProgressBar: true,
          });
          return;
        }
        Router.push({ pathname: '/home' });
        initLoginState(loginResponse.data.user, loginResponse.data.accessToken);
      });
      // Loging in the user
    });
  }

  getPasswordFormClassName(password, passwordConfirmation) {
    if (!passwordConfirmation || password === passwordConfirmation) {
      return 'validate';
    }
    return 'validate invalid';
  }

  validateForm() {
    const {
      password, passwordConfirmation, phoneNumber, firstName, lastName, email,
    } = this.state;
    const validationError = { isError: false, message: '' };
    if (!firstName || !lastName) {
      validationError.isError = true;
      validationError.message = 'Nama tidak boleh kosong';
      return validationError;
    }
    if (!email) {
      validationError.isError = true;
      validationError.message = 'Email tidak boleh kosong';
      return validationError;
    }
    if (!phoneNumber) {
      validationError.isError = true;
      validationError.message = 'Nomer Telepon tidak boleh kosong';
      return validationError;
    }
    if (!password || !passwordConfirmation) {
      validationError.isError = true;
      validationError.message = 'Password tidak boleh kosong';
      return validationError;
    }
    if (password.length < 8) {
      validationError.isError = true;
      validationError.message = 'Password minimum 8 karakter';
      return validationError;
    }
    if (password !== passwordConfirmation) {
      validationError.isError = true;
      validationError.message = 'Password dan konfirmasi harus sama';
      return validationError;
    }
    return validationError;
  }

  render() {
    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      password,
      passwordConfirmation,
      isLoading,
    } = this.state;
    return (
      <div>
        <Navbar />
        <div className="container">
          <h4 className="center-align">MENDAFTAR</h4>

          <form className="col s12 container" action="#" onSubmit={e => this.onSubmit(e)}>
            <div className="row input-row">
              <div className="col s6 input-field">
                <input
                  value={firstName}
                  onChange={e => this.setState({ firstName: e.target.value })}
                  id="first_name"
                  type="text"
                  className="validate"
                />
                <label htmlFor="first_name">First Name</label>
              </div>
              <div className="col s6 input-field">
                <input
                  onChange={e => this.setState({ lastName: e.target.value })}
                  value={lastName}
                  id="last_name"
                  type="text"
                  className="validate"
                />
                <label htmlFor="last_name">Last Name</label>
              </div>
            </div>
            <div className="col s12 input-field">
              <input
                onChange={e => this.setState({ email: e.target.value })}
                value={email}
                id="email"
                type="email"
                className="validate"
              />
              <label htmlFor="email">Email</label>
            </div>
            <div className="col s12 input-field">
              <input
                onChange={e => this.setState({ phoneNumber: e.target.value })}
                value={phoneNumber}
                id="phone"
                type="tel"
                className="validate"
              />
              <label htmlFor="phone">Phone Number</label>
            </div>
            <div className="col s12 input-field">
              <input
                onChange={e => this.setState({ password: e.target.value })}
                value={password}
                id="password"
                type="password"
                className="validate"
              />
              <label htmlFor="password">Password</label>
            </div>
            <div className="col s12 input-field">
              <input
                value={passwordConfirmation}
                id="confirmPassword"
                type="password"
                onChange={e => this.setState({ passwordConfirmation: e.target.value })}
                className={this.getPasswordFormClassName(password, passwordConfirmation)}
              />
              <label htmlFor="confirmPassword">Pasword Confirmation</label>
            </div>
            <button
              className="btn waves-effect waves-light register-button"
              type="submit"
              name="action"
            >
              <i className="material-icons left">person_add</i>
              Mendaftar
            </button>
          </form>
        </div>
        <ToastContainer />
        <Loading isVisible={isLoading} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  userState: getUserDataState(state.userState),
  accessToken: getUserAccessTokenState(state.userState),
});

const mapDispatchToProps = dispatch => ({
  initLoginState: (user, accessToken) => dispatch(userLoginState(user, accessToken)),
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Register));
