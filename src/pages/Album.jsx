import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Hearder';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import AlbumCard from '../components/AlbumCard';

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
    console.log(albumCollectionMusic);
    return (
      <div data-testid="page-album" className="album-container">
        <Header />
        {
          (loading)
            ? <Loading />
            : (
              albumCollectionMusic.map((e, index) => (
                (index === 0) ? (
                  <AlbumCard
                    key={ e.collectionId }
                    album={ e }
                  />
                ) : (
                  <MusicCard
                    key={ e.trackId }
                    trackSong={ e }
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
