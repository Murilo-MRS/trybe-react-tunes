import React, { Component } from 'react';
import { createUser } from '../services/userAPI';

class Login extends Component {
  state = {
    userName: '',
  };

  handleInputUser = ({ target }) => {
    console.log(target.value);
    this.setState({ userName: target.value });
  };

  handleLogin = async (userName) => {
    await createUser({ name: userName });
    console.log(await typeof createUser({ name: userName }));
  };

  render() {
    const userLength = 2;
    const { userName } = this.state;
    return (
      <div data-testid="page-login" className="login-container">
        <div className="user-input">
          <label htmlFor="userName">
            Nome:
            {' '}
            <input
              type="text"
              name="userName"
              value={ userName }
              data-testid="login-name-input"
              onChange={ this.handleInputUser }
            />
          </label>
        </div>
        <button
          type="button"
          data-testid="login-submit-button"
          className="btn"
          onClick={ () => this.handleLogin(userName) } // ANOTACAO ERRO 1
          disabled={ userName.length <= userLength }
        >
          Entrar
        </button>
      </div>
    );
  }
}

export default Login;
// ANOTACAO ERRO 1 - SEMPRE UTLIZAR CALLBACK QUANDO PRECISAR PASSAR UMA PARAM EM ONCLICK
