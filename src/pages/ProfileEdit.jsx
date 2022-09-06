import PropTypes from 'prop-types';
import React, { Component } from 'react';
// import { Redirect } from 'react-router-dom';
import Header from '../components/Hearder';
import Loading from '../components/Loading';
import { getUser, updateUser } from '../services/userAPI';

class ProfileEdit extends Component {
  state = {
    name: '',
    email: '',
    image: '',
    description: '',
    isDisabled: true,
    loading: false,
    userUpdated: false,
  };

  componentDidMount() {
    this.handleGetUser();
  }

  handleGetUser = async () => {
    this.setState({ loading: true }, async () => {
      const promiseUserGet = await getUser();
      const { name, email, image, description } = promiseUserGet;
      if (promiseUserGet) {
        this.setState({
          name,
          email,
          image,
          description,
          loading: false,
        });
      }
    });
  };

  verifyText = () => {
    const { name, email, image, description } = this.state;
    // console.log(this.state);
    // https://www.horadecodar.com.br/2020/09/13/como-validar-email-com-javascript/ validacao de email
    const testValidation = /\S+@\S+\.\S+/;
    const emailValidation = testValidation.test(email);
    // const emailValidation = email.endsWith('.com')
    //   && email.includes('@')
    //   && email.split('')[0] !== '@';
    const allWithText = (name.length !== 0 && email.length !== 0
    && image.length !== 0 && description.length !== 0);
    // console.log(allWithText);
    if (allWithText && emailValidation) {
      this.setState({ isDisabled: false });
    } else {
      this.setState({ isDisabled: true });
    }
  };

  handleInputProfileEdit = ({ target }) => {
    // const { name, value } = target;
    this.setState({
      [target.name]: target.value,
    }, () => {
      this.verifyText();
    });
  };

  handleProfileUpdate = async (obj) => {
    const { history } = this.props;

    // this.setState({ loading: true });
    // await updateUser(obj);
    // this.setState({ userUpdated: true });
    this.setState({ loading: true }, async () => {
      const promiseUpdated = await updateUser(obj);
      console.log(() => promiseUpdated, 'updateuser', this.state);
      if (promiseUpdated === 'OK') history.push('/profile'); // this.setState({ userUpdated: true });
      this.setState({ loading: false });
    });
  };

  render() {
    const {
      name,
      email,
      image,
      description,
      isDisabled,
      loading,
      // userUpdated,
    } = this.state;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        {loading ? (
          <Loading />
        ) : (
          <form className="user-infos" data-testid="profile-image">
            <img src={ image } alt={ name } />
            <input
              type="text"
              name="image"
              onChange={ this.handleInputProfileEdit }
              value={ image }
              placeholder="Link da imagem"
              data-testid="edit-input-image"
            />
            <input
              type="text"
              name="name"
              data-testid="edit-input-name"
              onChange={ this.handleInputProfileEdit }
              value={ name }
              placeholder="Nome"
            />
            <input
              type="text"
              name="email"
              data-testid="edit-input-email"
              onChange={ this.handleInputProfileEdit }
              value={ email }
              placeholder="email"
            />
            <input
              type="text"
              data-testid="edit-input-description"
              name="description"
              onChange={ this.handleInputProfileEdit }
              value={ description }
              placeholder="Descricao"
            />
            <button
              disabled={ isDisabled }
              className="btn"
              type="button"
              data-testid="edit-button-save"
              onClick={ () => (
                this.handleProfileUpdate({ name, email, description, image })) }
            >
              Editar perfil
            </button>
          </form>
        )}
        {/* {(userUpdated) && <Redirect to="/profile" />} */}
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default ProfileEdit;
