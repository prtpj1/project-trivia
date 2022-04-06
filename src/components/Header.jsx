import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

class Header extends Component {
  render() {
    const { name, score, email } = this.props;
    const userAvatar = `https://www.gravatar.com/avatar/${md5(email).toString()}`;
    return (
      <div>
        <img
          alt="avatar"
          data-testid="header-profile-picture"
          src={ userAvatar }
        />
        <span
          data-testid="header-player-name"
          id="player-name"
          name="player-name"
        >
          Nome do jogador:
          { name }
        </span>
        <span
          data-testid="header-score"
          id="score"
          name="score"
        >
          Score:
          { score }
        </span>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.playerReducer.gravatarEmail,
  name: state.playerReducer.name,
  score: state.playerReducer.score,
});

export default connect(mapStateToProps)(Header);

Header.propTypes = {
  email: propTypes.string,
  name: propTypes.string.isRequired,
  score: propTypes.number.isRequired,
};

Header.defaultProps = {
  email: '',
};
