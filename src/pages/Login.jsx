import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Loading from '../components/Loading';
// import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';

class Login extends Component {
  state = {
    userName: '',
    isDisabled: true,
    loading: false,
    userCreated: false,
  };

  handleInputUser = ({ target }) => {
    this.setState({ userName: target.value }, () => {
      const { userName } = this.state;
      const userLength = 2;
      if (userName.length <= userLength) return this.setState({ isDisabled: true });
      this.setState({ isDisabled: false });
    });
  };

  handleLogin = async (userName) => {
    this.setState({ loading: true }, async () => {
      const promiseCreate = await createUser({ name: userName });
      if (promiseCreate === 'OK') this.setState({ userCreated: true });
      this.setState({ loading: false });
    });
  };

  render() {
    const { userName, isDisabled, loading, userCreated } = this.state;
    return (
      <div>
        {
          loading
            ? <Loading />
            : (
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
                  disabled={ isDisabled }
                >
                  Entrar
                </button>
              </div>
            )
        }
        {
          (userCreated) && <Redirect to="/search" />
        }
      </div>
    );
  }
}

export default Login;
// ANOTACAO ERRO 1 - SEMPRE UTLIZAR CALLBACK QUANDO PRECISAR PASSAR UMA PARAM EM ONCLICK
// ANOTACAO ERRO 2 - SO CRIE STATE ONDE FOR USAR PARA NAO AUMENTAR COMPLEXIDADE,(nesse caso no filho de App)
// ANOTACAO ERRO 3 - handleChange generico necessita do atributo NAME ser o mesmo valor no state
// ANOTACAO ERRO 4 - segundo parametro de setState para verificar apos atualizacao de estado
// ANOTACAO ERRO 5 - o PROPS DE ROUTE TEMOS HISTORY, LOCATION E MATCH caso precisamos navegar(redirect) para outra página usamos a prop history q possui a key PUSH
