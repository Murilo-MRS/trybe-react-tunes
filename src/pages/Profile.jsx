import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Hearder';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';

class Profile extends Component {
  state = {
    userName: '',
    userEmail: '',
    userImage: 'url-to-image',
    userDescription: '',
    loading: false,
  };

  componentDidMount() {
    this.handleUserOnHeader();
  }

  handleUserOnHeader = async () => {
    this.setState({ loading: true }, async () => {
      const promiseUserGet = await getUser();
      if (promiseUserGet) {
        this.setState({
          userName: promiseUserGet.name,
          userEmail: promiseUserGet.email,
          userImage: promiseUserGet.image,
          userDescription: promiseUserGet.description,
        });
      }
      this.setState({ loading: false });
    });
  };

  render() {
    const {
      userName,
      userEmail,
      userImage,
      userDescription,
      loading,
    } = this.state;
    return (
      <div data-testid="page-profile" className="profile-container">
        <Header />
        {
          loading
            ? <Loading />
            : (
              <div className="user-infos" data-testid="profile-image">
                <img src={ userImage } alt={ userName } />
                <p>{userName}</p>
                <p>{userEmail}</p>
                <p>{userDescription}</p>
                <Link to="/profile/edit">Editar perfil</Link>
              </div>
            )
        }
      </div>
    );
  }
}

export default Profile;
