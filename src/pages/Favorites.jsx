import React, { Component } from 'react';
import Header from '../components/Hearder';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Favorites extends Component {
  state = {
    favorites: [],
    loading: true,
  };

  async componentDidMount() {
    const favoriteMusic = await getFavoriteSongs();
    this.setState({ favorites: favoriteMusic }, () => {
      if (favoriteMusic) this.setState({ favorites: favoriteMusic });
      this.setState({
        loading: false,
      });
    });
    this.setState({ favorites: favoriteMusic });
  }

  render() {
    const { favorites, loading } = this.state;
    console.log(favorites);
    return (
      <div data-testid="page-favorites" className="favorites-container">
        <Header />
        {
          loading
            ? <Loading />
            : favorites.map((e) => <MusicCard key={ e.trackId } trackSong={ e } />)
        }
      </div>
    );
  }
}

export default Favorites;
