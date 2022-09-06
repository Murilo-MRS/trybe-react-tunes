import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Hearder';
import Loading from '../components/Loading';
import { getUser, updateUser } from '../services/userAPI';

class ProfileEdit extends Component {
  state = {
    userName: '',
    userEmail: '',
    userImage: '',
    userDescription: '',
    isDisabled: true,
    loading: false,
    userUpdated: false,
  };

  componentDidMount() {
    getUser();
  }

  // handleUserOnHeader = async () => {
  //   this.setState({ loading: true }, async () => {
  //     const promiseUserGet = await getUser();
  //     if (promiseUserGet) {
  //       this.setState({
  //         userName: promiseUserGet.name,
  //       });
  //     }
  //     this.setState({ loading: false });
  //   });
  // };

  handleInputProfileEdit = ({ target }) => {
    const { name } = target;
    const { userName, userEmail, userImage, userDescription } = this.state;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    }, () => {
      // https://www.horadecodar.com.br/2020/09/13/como-validar-email-com-javascript/ validacao de email
      const testValidation = /\S+@\S+\.\S+/;
      const emailValidation = testValidation.test(userEmail);
      if (
        userName !== ''
        && userEmail !== ''
        && emailValidation
        && userImage !== ''
        && userDescription !== '') {
        this.setState({ isDisabled: false });
      } else {
        this.setState({ isDisabled: true });
      }
    });
  };

  handleProfileEdit = async (obj) => {
    this.setState({ loading: true }, async () => {
      const promiseUpdated = await updateUser(obj);
      if (promiseUpdated === 'OK') this.setState({ userUpdated: true });
      this.setState({ loading: false });
    });
  };

  render() {
    const {
      userName,
      userEmail,
      userImage,
      userDescription,
      isDisabled,
      loading,
      userUpdated,
    } = this.state;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        {loading ? (
          <Loading />
        ) : (
          <form className="user-infos" data-testid="profile-image">
            <img src={ userImage } alt={ userName } data-testid="edit-input-image" />
            <input
              type="text"
              name="userImage"
              onChange={ this.handleInputProfileEdit }
              value={ userImage }
              placeholder="Link da imagem"
            />
            <input
              type="text"
              name="userName"
              data-testid="edit-input-name"
              onChange={ this.handleInputProfileEdit }
              value={ userName }
              placeholder="Nome"
            />
            <input
              type="text"
              name="userEmail"
              data-testid="edit-input-email"
              onChange={ this.handleInputProfileEdit }
              value={ userEmail }
              placeholder="email"
            />
            <input
              type="text"
              data-testid="edit-input-description"
              name="userDescription"
              onChange={ this.handleInputProfileEdit }
              value={ userDescription }
              placeholder="Descricao"
            />
            <button
              disabled={ isDisabled }
              className="btn"
              type="button"
              data-testid="edit-button-save"
              onClick={ () => this.handleProfileEdit(
                { userImage, userName, userEmail, userDescription },
              ) }
            >
              Editar perfil
            </button>
          </form>
        )}
        {(userUpdated) && <Redirect to="/profile" />}
      </div>
    );
  }
}

export default ProfileEdit;
