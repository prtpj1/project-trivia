import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import { fetchAvatar } from '../services';

class Header extends Component {
  componentDidMount() {
    const { email } = this.props;

    const cryptoEmail = md5(email).toString();
    // console.log(cryptoEmail);
    fetchAvatar(cryptoEmail);
    console.log(cryptoEmail);
  }

  render() {
    const { name, score } = this.props;
    return (
      <div>
        <img
          alt="avatar"
          data-testid="header-profile-picture"
          src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50"
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
  // avatar: ,
  email: state.playerReducer.email,
  name: state.playerReducer.name,
  score: state.playerReducer.score,
});

export default connect(mapStateToProps)(Header);

Header.propTypes = {
  email: propTypes.string.isRequired,
  name: propTypes.string.isRequired,
  score: propTypes.number.isRequired,
};
