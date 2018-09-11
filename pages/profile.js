import React from 'react';
import fetch from 'isomorphic-unfetch';
import Router from 'next/router';
import { connect } from 'react-redux';
import Navbar from '../layout/Navbar';
// $FlowFixMe
import '../styles/profile.scss';
import { DEFAULT_HEADER } from '../client/services/helper';
import { getUserAccessTokenState, getUserDataState } from '../client/ducks/user';
import Loading from '../layout/Loading';
import WithProgress from '../layout/WithProgress';

const DUMMY_USER_ID = '5b9011117c14abdb6c297a11';

type ProfileState = {
  isEditing: boolean,
  firstName: string,
  lastName: string,
  email: string,
  phoneNumber: string,
  profilePicture: string,
  address: string,
  isLoading: boolean,
};

class Profile extends React.Component<null, ProfileState> {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      firstName: props.user.first_name,
      lastName: props.user.last_name,
      profilePicture: props.user.profile_picture,
      email: props.user.email,
      phoneNumber: props.user.phone_number,
      address: props.user.address || 'Anda Belum Memasukan Alamat',
      isLoading: true,
    };
  }

  componentWillMount() {
    const { accessToken } = this.props;
    if (!accessToken) {
      Router.replace('/login');
      return;
    }
    this.setState({ isLoading: false });
  }

  render() {
    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      address,
      isLoading,
      profilePicture,
    } = this.state;
    if (isLoading) return <Loading isVisible />;
    return (
      <div>
        <Navbar
          rightIconName="edit_mode"
          onRightIconClick={() => Router.push('/profile/edit')}
          withRightIcon
        />
        <WithProgress />
        <div className="container center-align profile-container">
          <img className="center-align profile-picture margin-center" src={profilePicture} />
          <p className="text-username">
            <span>{`${firstName} ${lastName}`}</span>
          </p>

          <div>
            <ul className="collection left-align">
              <li className="collection-item center-align avatar">
                <i className="material-icons circle">phone_android</i>
                <span className="title">Nomor Handphone</span>

                <p>{phoneNumber}</p>
              </li>
              <li className="collection-item center-align avatar">
                <i className="material-icons circle">email</i>
                <span className="title">Email</span>

                <p>{email}</p>
              </li>
              <li className="collection-item center-align avatar">
                <i className="material-icons circle">place</i>
                <span className="title">Alamat</span>

                <p>{address}</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: getUserDataState(state.userState),
  accessToken: getUserAccessTokenState(state.userState),
});

export default connect(mapStateToProps)(Profile);
