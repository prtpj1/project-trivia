import React, { Component } from 'react';
import { connect } from 'react-redux';
import './game.css';
import propTypes from 'prop-types';
import Header from '../components/Header';
import {
  actionGetToken,
  actionSaveScore,
  actionSumAssertions,
}
from '../redux/actions/actions';

class Game extends Component {
  constructor() {
    super();
    this.state = {
      count: 0,
      correctAnswer: '',
      wrongAnswers: [],
      btnNext: false,
      trueAnswer: '',
      wrongOne: '',
      disabledAnswer: false,
      timer: 30,
      assertions: 1,
    };
  }

  componentDidMount = async () => {
    const interval = 30000;
    const um = 1000;
    await this.validateToken();
    setTimeout(this.disableQuiz, interval);
    setInterval(this.initTimer, um);
    this.createButtons();
  }

  disableQuiz = () => {
    this.setState({ disabledAnswer: true });
  }

  initTimer = () => {
    const { timer } = this.state;
    if (timer > 0) {
      this.setState({ timer: timer - 1 });
    }
  }

  validateToken = async () => {
    const { getToken, quiz } = this.props;
    const three = 3;
    if (quiz.response_code === three) {
      getToken();
    }
  }

  selectAnswer = () => {
    this.setState({
      btnNext: true,
      trueAnswer: 'showAnswer',
      wrongOne: 'showWrong',
    });
  }

  handleScore = () => {
    const { count, timer } = this.state;
    const { quiz, saveScore } = this.props;
    const tres = 3;
    const dez = 10;
    const diff = quiz.results[count].difficulty;
    switch (diff) {
    case 'easy': return saveScore(dez + timer);
    case 'medium': return saveScore(dez + (timer * 2));
    case 'hard': return saveScore(dez + (timer * tres));
    default:
      saveScore(0);
    }
  }

  mix = ({ target }) => {
    const { assertions, correctAnswer } = this.state;
    const { sumAssertions } = this.props;
    console.log(target);
    this.setState({
      assertions: correctAnswer === target.value ? assertions + 1 : assertions,
    });
    sumAssertions(assertions);
    this.handleScore();
    this.selectAnswer();
  }

  handleNextBtn = () => {
    const { history } = this.props;
    const { count } = this.state;
    const four = 4;
    if (count === four) {
      history.push('/feedback');
    }
    this.setState({
      disabledAnswer: false,
      trueAnswer: '',
      wrongOne: '',
      timer: 30,
    });
    this.updateQuiz();
    this.setState({ btnNext: false });
  }

  updateQuiz = () => {
    const { count, wrongAnswers } = this.state;
    if (count <= wrongAnswers.length - 1) {
      this.setState({
        count: count + 1,
      }, this.createButtons);
    }
  }

  createButtons = () => {
    const { count } = this.state;
    const { quiz } = this.props;
    const nRand = 0.5;
    const answers = [...quiz.results[count].incorrect_answers,
      quiz.results[count].correct_answer].sort(() => nRand - Math.random());
      // randomizacao da array retirado de https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
    const correct = quiz.results[count].correct_answer;
    this.setState({
      correctAnswer: correct,
      wrongAnswers: answers,
    });
  }

  render() {
    const { count, wrongAnswers, correctAnswer,
      btnNext, trueAnswer, wrongOne, disabledAnswer, timer } = this.state;
    const { quiz } = this.props;
    return (
      <div>
        <Header />
        <span>{timer}</span>
        <div>
          <h1 data-testid="question-category">{ quiz.results[count].category }</h1>
          <p data-testid="question-text">{ quiz.results[count].question }</p>
          <div data-testid="answer-options">
            {
              wrongAnswers.map((answer, index) => {
                if (answer === correctAnswer) {
                  return (
                    <button
                      key={ index }
                      type="button"
                      onClick={ this.mix }
                      disabled={ disabledAnswer }
                      className={ `correct-answer ${trueAnswer}` }
                      data-testid="correct-answer"
                      value={ correctAnswer }
                    >
                      { answer }
                    </button>
                  );
                }
                return (
                  <button
                    key={ index }
                    type="button"
                    onClick={ this.selectAnswer }
                    disabled={ disabledAnswer }
                    className={ `wrong-answer ${wrongOne}` }
                    data-testid={ `wrong-answer${index}` }
                  >
                    { answer }
                  </button>
                );
              })
            }

          </div>
        </div>
        {btnNext ? (
          <button
            data-testid="btn-next"
            onClick={ this.handleNextBtn }
            type="button"
          >
            Next
          </button>
        ) : ''}
      </div>
    );
  }
}
// (
//   <button
//     key={ index }
//     type="button"
//     onClick={ this.selectAnswer }
//     disabled={ disabledAnswer }
//     className={ answer === correctAnswer
//       ? `correct-answer ${trueAnswer}`
//       : `wrong-answer ${wrongOne}` }
//     data-testid={ answer === correctAnswer
//       ? 'correct-answer'
//       : `wrong-answer${index}` }
//   >
//     { answer }
//   </button>
// )
const mapStateToProps = (state) => ({
  token: state.token,
  quiz: state.quiz,
});

const mapDispatchToProps = (dispatch) => ({
  getToken: () => dispatch(actionGetToken()),
  saveScore: (score) => dispatch(actionSaveScore(score)),
  sumAssertions: (assertions) => dispatch(actionSumAssertions(assertions)),
});

Game.defaultProps = {
  quiz: {},
};

Game.propTypes = {
  getToken: propTypes.func.isRequired,
  history: propTypes.shape({ push: propTypes.func }).isRequired,
  quiz: propTypes.shape({
    results: propTypes.arrayOf(propTypes.object),
    response_code: propTypes.number,
  }),
  saveScore: propTypes.func.isRequired,
  sumAssertions: propTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
