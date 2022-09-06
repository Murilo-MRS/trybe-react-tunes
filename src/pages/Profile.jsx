import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Hearder';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';

class Profile extends Component {
  state = {
    loading: false,
  };

  componentDidMount() {
    this.handleUserOnHeader();
  }

  handleUserOnHeader = async () => {
    this.setState({ loading: true }, async () => {
      const promiseUserGet = await getUser();
      const { name, email, image, description } = promiseUserGet;
      if (promiseUserGet) {
        this.setState({
          name,
          email,
          image,
          description,
        });
      }
      this.setState({ loading: false });
    });
  };

  render() {
    const {
      name,
      email,
      image,
      description,
      loading,
    } = this.state;
    return (
      <div data-testid="page-profile" className="profile-container">
        <Header />
        {
          loading
            ? <Loading />
            : (
              <div className="user-infos">
                <img src={ image } alt={ name } data-testid="profile-image" />
                <p>{name}</p>
                <p>{email}</p>
                <p>{description}</p>
                <Link to="/profile/edit">Editar perfil</Link>
              </div>
            )
        }
      </div>
    );
  }
}

export default Profile;
