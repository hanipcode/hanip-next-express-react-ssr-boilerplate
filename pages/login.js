import React from 'react';
import { connect } from 'react-redux';
import Link from 'next/link';
import Router from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import Navbar from '../layout/Navbar';
import '../styles/login.scss';
import { loginUser } from '../client/services/user';
import Loading from '../layout/Loading';
import { getUserDataState, getUserAccessTokenState, userLoginState } from '../client/ducks/user';

interface LoginPageProps {
  user: any;
  accessToken: string;
  initLoginState(user: any, accessToken: string): any;
}

type LoginPageState = {
  email: string,
  password: string,
  isLoading: boolean,
};

// eslint-disable-next-line
class Login extends React.Component<LoginPageProps, LoginPageState> {
  state = {
    email: '',
    password: '',
    isLoading: false,
  };

  onSubmit(e) {
    e.preventDefault();
    const { initLoginState } = this.props;
    const { email, password } = this.state;
    const validationError = this.validateForm();
    if (validationError.isError) {
      toast(validationError.message, {
        position: 'bottom-center',
        hideProgressBar: true,
      });
      return;
    }
    this.setState({ isLoading: true });
    loginUser(email, password).then((loginResponse) => {
      this.setState({ isLoading: false });
      if (loginResponse.error) {
        toast(loginResponse.message, {
          type: 'error',
          position: 'bottom-center',
          hideProgressBar: true,
        });
        return;
      }
      initLoginState(loginResponse.data.user, loginResponse.data.accessToken);
      Router.push({ pathname: '/home' });
    });
  }

  validateForm() {
    const { email, password, isLoading } = this.state;
    const validationError = { isError: false, message: '' };
    if (!email || !password) {
      validationError.isError = true;
      validationError.message = 'Harap Mengisi Password dan Email';
    }
    return validationError;
  }

  render() {
    const { email, password, isLoading } = this.state;
    return (
      <div>
        <Navbar />
        <article className="loginContent">
          <div className="container">
            <form className="col s12" onSubmit={e => this.onSubmit(e)}>
              <div className="input-field col s12">
                <i className="material-icons prefix">account_circle</i>
                <input
                  value={email}
                  onChange={e => this.setState({ email: e.target.value })}
                  id="email"
                  type="text"
                  className="validate"
                />
                <label htmlFor="email">Email</label>
              </div>
              <div className="input-field col s12">
                <i className="material-icons prefix">lock</i>
                <input
                  id="password"
                  value={password}
                  onChange={e => this.setState({ password: e.target.value })}
                  type="password"
                  className="validate"
                />
                <label htmlFor="password">Password</label>
              </div>
              <button
                className="btn waves-effect waves-light align-center login-button"
                type="submit"
                name="action"
              >
                Submit
                <i className="material-icons right">send</i>
              </button>
            </form>
            <p className="center-align register-text">
              Tidak Memiliki akun?
              <Link href="/register">
                <a>
                  <span> Mendaftar</span>
                </a>
              </Link>
            </p>
          </div>
        </article>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
