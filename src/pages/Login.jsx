import React, { Component } from 'react';

class Login extends Component {
  render() {
    return (
      <div data-testid="page-login" className="login-container">
        <div className="user-input">
          <label htmlFor="userName">
            Nome:
            <input
              type="text"
              name="userName"
              id="userName"
              data-testid="login-name-input"
            />
          </label>
        </div>
        <button
          type="button"
          data-testid="login-submit-button"
        >
          Entrar
        </button>
      </div>
    );
  }
}

export default Login;
