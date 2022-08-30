import React, { Component } from 'react';
import Header from '../components/Hearder';

class Search extends Component {
  render() {
    return (
      <div data-testid="page-search" className="search-container">
        <Header />
      </div>
    );
  }
}

export default Search;
