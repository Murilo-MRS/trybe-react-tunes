import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MusicCard extends Component {
  render() {
    const { trackName, previewUrl } = this.props;
    return (
      <div className="music-card">
        <div className="music-name">{trackName}</div>
        <audio data-testid="audio-component" src={ `${previewUrl}` } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento

          <code>audio</code>
          .
        </audio>
      </div>
    );
  }
}

MusicCard.propTypes = {
  previewUrl: PropTypes.string,
}.isRequired;

export default MusicCard;
