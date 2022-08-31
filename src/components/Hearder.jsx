import React, { Component } from 'react';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
// import PropTypes from 'prop-types';

class Header extends Component {
  state = {
    userName: '',
    loading: false,
  };

  componentDidMount() {
    this.handleUserOnHeader();
  }

  handleUserOnHeader = async () => {
    this.setState({ loading: true }, async () => {
      const promiseUserGet = await getUser();
      // console.log(promiseUserGet.name);
      if (promiseUserGet) this.setState({ userName: promiseUserGet.name });
      this.setState({ loading: false });
    });
  };

  render() {
    const { userName, loading } = this.state;
    return (
      <header data-testid="header-component">
        <span data-testid="header-user-name">
          {
            loading
              ? <Loading />
              : userName
          }
        </span>
      </header>
    );
  }
}

export default Header;
