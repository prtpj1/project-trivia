import React, { Component } from 'react';
import propTypes from 'prop-types';
import Button from '../components/Button';

class Ranking extends Component {
  goToHome = () => {
    const { history } = this.props;
    history.push('/');
  }

  render() {
    return (
      <div>
        <h2 data-testid="ranking-title">Ranking</h2>
        <Button
          testid="btn-go-home"
          label="Home"
          onClick={ this.goToHome }
        />
      </div>
    );
  }
}

Ranking.propTypes = {
  history: propTypes.shape({ push: propTypes.func }).isRequired,
};

export default Ranking;
