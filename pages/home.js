import React from 'react';
import { connect } from 'react-redux';
import Router from 'next/router';
import Navbar from '../layout/Navbar';
import '../styles/home.scss';
import { getUserDataState, getUserAccessTokenState } from '../client/ducks/user';
import Loading from '../layout/Loading';
import WithProgress from '../layout/WithProgress';

type HomeState = {
  isLoading: boolean,
};

// eslint-disable-next-line
class Home extends React.Component<null, HomeState> {
  state = {
    isLoading: true,
  };

  componentWillMount() {
    const { accessToken } = this.props;
    if (!accessToken) {
      Router.replace('/login');
      return;
    }
    this.setState({ isLoading: false });
  }

  render() {
    const { isLoading } = this.state;
    if (isLoading) return <Loading isVisible />;
    return (
      <div>
        <Navbar />
        <WithProgress />
        <article className="homeContent">
          <h3>This is your next home</h3>
        </article>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  userState: getUserDataState(state.userState),
  accessToken: getUserAccessTokenState(state.userState),
});

export default connect(mapStateToProps)(Home);
