import React, { Component } from 'react';
import PropTypes from 'prop-types';

class AlbumCard extends Component {
  render() {
    const { album } = this.props;
    const { collectionId, artistName, artworkUrl100, collectionName } = album;

    console.log(album);
    return (
      <div className="album-container" key={ collectionId }>
        <div className="album-card">
          <img src={ artworkUrl100 } alt={ artistName } />
          <p data-testid="artist-name">
            {artistName}
          </p>
          <p data-testid="album-name">
            {collectionName}
          </p>
        </div>
      </div>
    );
  }
}

AlbumCard.propTypes = {
  album: PropTypes.shape({
    artistName: PropTypes.string,
    artworkUrl100: PropTypes.string,
    collectionId: PropTypes.string,
    collectionName: PropTypes.string,
  }),
}.isRequired;

export default AlbumCard;
