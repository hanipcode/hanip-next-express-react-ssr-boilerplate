import React from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { connect } from 'react-redux';
import Router from 'next/router';
import Navbar from '../layout/Navbar';

import 'react-toastify/dist/ReactToastify.css';

import '../styles/register.scss';
import Loading from '../layout/Loading';
import { getUserDataState, getUserAccessTokenState, userEditState } from '../client/ducks/user';
import { UserReturnType, EditPayload } from '../client/services/Types/User';
import MimeHelper from '../client/helpers/mime';
import { editUser } from '../client/services/user';

type EditProfileState = {
  firstName: string,
  lastName: string,
  email: string,
  phoneNumber: string,
  password: string,
  passwordConfirmation: string,
  profilePicture: File,
  isLoading: boolean,
};

interface EditProfileProps {
  user: UserReturnType,
  accessToken: string,
  initEditProfileState: (userData: any) => any,
}

class EditProfile extends React.Component<EditProfileProps, EditProfileState> {
  constructor(props) {
    super(props);
    if (!props.accessToken || !props.user) {
      Router.replace('/login');
      return;
    }
    this.state = {
      password: '',
      passwordConfirmation: '',
      phoneNumber: props.user.phone_number,
      firstName: props.user.first_name,
      lastName: props.user.last_name,
      profilePicture: null,
      email: props.user.email,
      isLoading: false,
    };
  }

  onSubmit(e) {
    e.preventDefault();
    const validationError = this.validateForm();

    if (validationError.isError) {
      toast(validationError.message, {
        position: 'bottom-center',
        type: 'error',
        hideProgressBar: true,
      });
      return;
    }
    this.setState({ isLoading: true });
    const {
      password, phoneNumber, firstName, lastName, email, profilePicture,
    } = this.state;
    const { user, accessToken, initEditProfileState } = this.props;
    const payload: EditPayload = {
      userId: user._id,
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
      profilePicture,
    };
    editUser(payload, accessToken)
      .then((response) => {
        this.setState({ isLoading: false });
        if (response.error) {
          toast(response.message, {
            position: 'bottom-center',
            type: 'error',
            hideProgressBar: true,
          });
          return;
        }
        initEditProfileState(response.data);
        toast(response.message, {
          position: 'bottom-center',
          type: 'success',
          hideProgressBar: true,
        });
        Router.replace('/profile')
      })
      .catch((error) => {
        console.log(error);
        this.setState({ isLoading: false });
      });
  }

  validateForm() {
    const { password, passwordConfirmation, profilePicture } = this.state;
    const validationError = { isError: false, message: '' };
    if (password.length > 0) {
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
    }
    if (profilePicture) {
      if (!MimeHelper.isImage(profilePicture.type)) {
        validationError.isError = true;
        validationError.message = 'Profile Picture hanya support format file gambar';
        return validationError;
      }
    }
    return validationError;
  }

  render() {
    const {
      password,
      phoneNumber,
      firstName,
      lastName,
      email,
      passwordConfirmation,
      isLoading,
      profilePicture,
    } = this.state;
    return (
      <div>
        <Navbar />
        <div className="container">
          <h4 className="center-align">Edit Profil</h4>

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
                className="validate"
              />
              <label htmlFor="confirmPassword">Pasword Confirmation</label>
            </div>
            <div className="col s12 file-field input-field">
              <div className="btn">
                <span>File</span>
                <input
                  type="file"
                  onChange={e => this.setState({ profilePicture: e.target.files[0] })}
                />
              </div>
              <div className="file-path-wrapper">
                <input className="file-path validate" type="text" />
                <label htmlFor="confirmPassword">Profile Picture</label>
              </div>
            </div>

            <button
              className="btn waves-effect waves-light register-button"
              type="submit"
              name="action"
            >
              Edit
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
  user: getUserDataState(state.userState),
  accessToken: getUserAccessTokenState(state.userState),
});

const mapDispatchToProps = dispatch => ({
  initEditProfileState: userData => dispatch(userEditState(userData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
