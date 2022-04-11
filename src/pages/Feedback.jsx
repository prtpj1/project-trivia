import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Button from '../components/Button';

class Feedback extends React.Component {
  handleButton = () => {
    const { history } = this.props;
    history.push('/');
  }

  goToRanking = () => {
    const { history } = this.props;
    history.push('/ranking');
  }

  render() {
    const { assertions, score } = this.props;
    const MIN_SCORE = 3;
    return (
      <div>
        <Header />
        {assertions < MIN_SCORE
          ? <p data-testid="feedback-text">Could be better...</p>
          : <p data-testid="feedback-text">Well Done!</p>}
        <div id="scoreboard">
          <div>
            Score:
            {' '}
            <span data-testid="feedback-total-score">{ score }</span>
          </div>
          <div>
            Acertos totais:
            {' '}
            <span data-testid="feedback-total-question">{ assertions }</span>
          </div>
        </div>
        <Button
          testid="btn-play-again"
          label="Play Again"
          onClick={ this.handleButton }
        />

        <Button
          testid="btn-ranking"
          label="Ranking"
          onClick={ this.goToRanking }
        />
      </div>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.func,
  score: PropTypes.number,
}.isRequired;

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
});

export default connect(mapStateToProps)(Feedback);
