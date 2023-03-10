import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends Component {
  state = {
    loading: false,
    checkedFavorite: false,
  };

  componentDidMount() {
    this.handleFavorited();
  }

  // AJUDA FILIPE LIMA TURMA B - NA handleFavorited
  handleFavorited = async () => {
    const { trackSong } = this.props;
    const { trackId } = trackSong;
    const favoriteMusic = await getFavoriteSongs();

    const favoriteValidation = favoriteMusic.some((e) => e.trackId === trackId);
    this.setState({ checkedFavorite: favoriteValidation });
  };

  favorite = ({ target }, track, updater) => {
    const { update } = this.props;
    if (target.checked) {
      this.setState({ loading: true }, async () => {
        const responseAdd = await addSong(track);
        if (responseAdd) {
          this.setState({ loading: false,
            checkedFavorite: true });
        }
      });
    } else {
      this.setState({ loading: true }, async () => {
        const responseRemove = await removeSong(track);
        if (responseRemove) {
          this.setState({
            loading: false,
            checkedFavorite: false,
          });
        }
      });
    }
    if (update) {
      removeSong(track);
      updater();
    }
  };

  render() {
    const { loading, checkedFavorite } = this.state;
    const { trackSong, update } = this.props;
    const { trackName, previewUrl, trackId } = trackSong;
    return (
      <div>
        <div className="music-card">
          <div className="music-name">{trackName}</div>
          <audio data-testid="audio-component" src={ `${previewUrl}` } controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento

            <code>audio</code>
            .
          </audio>
          {
            loading
              ? <Loading />
              : (
                <label htmlFor={ `${trackId}` }>
                  Favorita
                  <input
                    data-testid={ `checkbox-music-${trackId}` }
                    type="checkbox"
                    value={ `${trackId}` }
                    name={ `${trackId}` }
                    id={ `${trackId}` }
                    onChange={ (event) => this.favorite(event, trackSong, update) }
                    checked={ checkedFavorite }
                  />
                </label>
              )
          }
        </div>
      </div>
    );
  }
}

MusicCard.propTypes = {
  previewUrl: PropTypes.string,
}.isRequired;

export default MusicCard;
