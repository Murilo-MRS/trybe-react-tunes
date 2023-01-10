import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Hearder';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends Component {
  state = {
    artistSearch: '',
    isDisabled: true,
    loading: false,
    dataArtists: [],
    nothingFound: false,
  };

  handleInputUser = ({ target }) => {
    this.setState({ artistSearch: target.value }, () => {
      const { artistSearch } = this.state;
      const userLength = 2;
      if (artistSearch.length < userLength) return this.setState({ isDisabled: true });
      this.setState({ isDisabled: false });
    });
  };

  handleSearchBtn = (artistSearch) => {
    this.setState({ loading: true }, async () => {
      const searchAPIRsponse = await searchAlbumsAPI(artistSearch);
      if (searchAPIRsponse) this.setState({ dataArtists: searchAPIRsponse });
      this.setState({
        artistSearch: '',
        artistSearchResults: artistSearch,
        loading: false,
      });
      if (searchAPIRsponse.length < 1) this.setState({ nothingFound: true });
    });
  };

  render() {
    const {
      artistSearch,
      isDisabled,
      loading,
      dataArtists,
      artistSearchResults,
      nothingFound,
    } = this.state;
    return (
      <div data-testid="page-search" className="search-container">
        <Header />
        {loading ? (
          <Loading />
        ) : (
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
              onClick={ () => this.handleSearchBtn(artistSearch) }
            >
              Pesquisar
            </button>
          </form>
        )}
        {
          (dataArtists.length > 0)
          && (
            <p className="result-search-text">
              {`Resultado de álbuns de: ${artistSearchResults}`}
            </p>
          )
        }
        <div className="artist-search">
          {
            (dataArtists.length > 0)
              && dataArtists.map((e) => (
                <div className="music-search" key={ e.collectionId }>
                  <img src={ e.artworkUrl100 } alt={ e.collectionName } />
                  <p>{e.collectionName}</p>
                  <p>{e.artistName}</p>
                  <Link
                    data-testid={ `link-to-album-${e.collectionId}` }
                    to={ `/album/${e.collectionId}` }
                  >
                    Album
                  </Link>
                </div>
              ))
          }
          {(nothingFound) && <p>Nenhum álbum foi encontrado</p>}
        </div>
      </div>
    );
  }
}

export default Search;
// ANOTACAO DE ERRO 1 - ao atulizar STATE usamos o segundo param de setState para verificar de imediato apos requisicao
// TODO 1 - Criar componente AlbumCard para reutilizacao na Page Album
