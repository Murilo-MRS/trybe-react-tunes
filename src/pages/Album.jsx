import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Hearder';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';

import getMusics from '../services/musicsAPI';

class Album extends Component {
  state = {
    loading: false,
    albumCollectionMusic: [],
  };

  componentDidMount() {
    this.handleAlbumMatch();
  }

  handleAlbumMatch = async () => {
    const { match: { params: { id } } } = this.props;
    const responseAlbum = await getMusics(id);
    this.setState(
      {
        loading: true,
      },
      () => {
        console.log(responseAlbum);
        if (responseAlbum) this.setState({ albumCollectionMusic: responseAlbum });
        this.setState({
          loading: false,
        });
      },
    );
  };

  render() {
    const { albumCollectionMusic, loading } = this.state;
    return (
      <div data-testid="page-album" className="album-container">
        <Header />
        {
          (loading)
            ? <Loading />
            : (
              albumCollectionMusic.map((e, index) => (
                (index === 0) ? (
                  <div className="album-container" key={ e.collectionId }>
                    <div className="album-card">
                      <img src={ e.artworkUrl100 } alt={ e.artistName } />
                      <p data-testid="artist-name">
                        {e.artistName}
                      </p>
                      <p data-testid="album-name">
                        {e.collectionName}
                        {' '}
                        -
                        {' '}
                        {e.artistName}
                      </p>
                    </div>
                  </div>
                ) : (
                  <MusicCard
                    key={ e.trackId }
                    trackName={ e.trackName }
                    previewUrl={ e.previewUrl }
                  />
                )
              ))
            )
        }

      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
}.isRequired;

export default Album;
