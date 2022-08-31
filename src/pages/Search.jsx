import React, { Component } from 'react';
import Header from '../components/Hearder';

class Search extends Component {
  state = {
    artistSearch: '',
    isDisabled: true,
  };

  handleInputUser = ({ target }) => {
    console.log(target.value);
    this.setState({ artistSearch: target.value }, () => {
      const { artistSearch } = this.state;
      const userLength = 1;
      if (artistSearch.length <= userLength) return this.setState({ isDisabled: true });
      this.setState({ isDisabled: false });
    });
  };

  render() {
    const { artistSearch, isDisabled } = this.state;
    return (
      <div data-testid="page-search" className="search-container">
        <Header />
        <form>
          <input
            type="text"
            name="artistSearch"
            value={ artistSearch }
            data-testid="search-artist-input"
            className="input-search"
            placeholder="Buscar Artista"
            onChange={ this.handleInputUser }
          />
          <button
            className="btn"
            type="button"
            data-testid="search-artist-button"
            disabled={ isDisabled }
            // onClick={}
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
