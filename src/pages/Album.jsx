import React, { Component } from 'react';
import Header from '../components/Hearder';

class Album extends Component {
  render() {
    return (
      <div data-testid="page-album" className="album-container">
        <Header />
      </div>
    );
  }
}

export default Album;
