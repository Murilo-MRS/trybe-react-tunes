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
    this.favoriteList();
  }

  update = async () => {
    const { favorites } = this.state;
    this.setState({ loading: true });
    const updatedFavorites = await getFavoriteSongs();
    if (updatedFavorites !== favorites) {
      console.log('É diferente');
      this.setState({ favorites: updatedFavorites, loading: false });
    }
  };

  favoriteList = async () => {
    const favoriteMusic = await getFavoriteSongs();
    this.setState({ favorites: favoriteMusic }, async () => {
      if (favoriteMusic.length > 0) this.setState({ favorites: favoriteMusic });
      this.setState({
        loading: false,
      });
    });
  };

  render() {
    const { favorites, loading } = this.state;
    console.log(favorites);
    return (
      <div data-testid="page-favorites" className="favorites-container">
        <Header />
        {
          loading
            ? <Loading />
            : favorites.map((e) => (
              <MusicCard
                key={ e.trackId }
                trackSong={ e }
                update={ this.update }
              />))
        }
      </div>
    );
  }
}

export default Favorites;
