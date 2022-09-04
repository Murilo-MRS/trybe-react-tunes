import React, { Component } from 'react';
import Header from '../components/Hearder';
// import { addSong, removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';

class Favorites extends Component {
  render() {
    return (
      <div data-testid="page-favorites" className="favorites-container">
        <Header />
      </div>
    );
  }
}

export default Favorites;
