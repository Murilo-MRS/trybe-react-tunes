import React, { Component } from 'react';
import Header from '../components/Hearder';

class Profile extends Component {
  render() {
    return (
      <div data-testid="page-profile" className="profile-container">
        <Header />
      </div>
    );
  }
}

export default Profile;
