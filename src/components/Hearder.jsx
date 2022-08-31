import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Loading from './Loading';
import { getUser } from '../services/userAPI';
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
      <header data-testid="header-component" className="header-component">
        <span data-testid="header-user-name" className="header-user-name">
          {
            loading
              ? <Loading />
              : userName
          }
        </span>
        <nav className="nav-bar">
          <Link className="nav-links" data-testid="link-to-search" to="/search">
            Search
          </Link>
          <Link className="nav-links" data-testid="link-to-favorites" to="/favorites">
            Favorites
          </Link>
          <Link className="nav-links" data-testid="link-to-profile" to="/profile">
            Profile
          </Link>
        </nav>
      </header>
    );
  }
}

export default Header;
