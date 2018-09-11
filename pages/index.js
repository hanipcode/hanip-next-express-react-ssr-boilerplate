import React from 'react';
import { connect } from 'react-redux';
import Router from 'next/router';
import Loading from '../layout/Loading';
import { getUserAccessTokenState } from '../client/ducks/user';

/* eslint-disable */
class Index extends React.Component {
  constructor(props) {
    if (props.accessToken) {
      Router.replace('/home');
    } else {
      Router.replace('/login');
    }
  }
  render() {
    return <Loading isVisible />;
  }
}

const mapStateToProps = state => ({
  accessToken: getUserAccessTokenState(state.userState),
});

export default connect(mapStateToProps)(Index);
