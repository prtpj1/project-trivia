import React, { Component } from 'react';
import { connect } from 'react-redux';
import './game.css';
import propTypes from 'prop-types';
import Header from '../components/Header';
import { actionGetToken, actionSaveScore } from '../redux/actions/actions';

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
    };
    this.counter = null;
  }

  componentDidMount = async () => {
    this.setState({ timer: 0 });
    const interval = 30000;
    this.initTimer();
    await this.validateToken();
    setInterval(this.disableQuiz, interval);
    this.createButtons();
  }

  componentDidUpdate() {
    const four = 4;
    const { count } = this.state;
    if (count === four) {
      clearInterval(this.updateQuiz);
    }
  }

  disableQuiz = () => {
    this.setState({ disabledAnswer: true });
  }

  initTimer = () => {
    const { timer } = this.state;
    console.log(timer);
    const intervalTimer = 1000;
    if (timer > 0) {
      this.counter = setInterval(() => {
        this.setState({ timer: timer - 1 });
      }, intervalTimer);
    } else if (timer === 0) {
      clearInterval(this.counter);
    }
  }

  validateToken = async () => {
    const { getToken, quiz } = this.props;
    const three = 3;
    if (quiz.response_code === three) {
      getToken();
    }
  }

  selectAnswer = ({ target }) => {
    const { count, timer } = this.state;
    const { quiz } = this.props; // saveScore
    const correct = 'correct-answer';
    const dez = 10;
    const tres = 3;
    const diff = quiz.results[count].difficulty;
    console.log(diff);
    this.setState({
      btnNext: true,
      trueAnswer: 'showAnswer',
      wrongOne: 'showWrong',
    });
    console.log(target.className);
    if (target.className.includes(correct) && diff === 'easy') {
      const result = dez + timer;
      return console.log(result);
    } if (target.className.includes(correct) === correct && diff === 'medium') {
      const mult = timer * 2;
      const result = dez + mult;
      return console.log(result);
    } if (target.className.includes(correct) === correct && diff === 'hard') {
      const mult = timer * tres;
      const result = dez + mult;
      return console.log(result);
    }
  }

  handleNextBtn = () => {
    this.setState({
      disabledAnswer: false,
      trueAnswer: '',
      wrongOne: '',
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
              wrongAnswers.map((answer, index) => (
                // randomizacao da array retirado de https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
                <button
                  key={ index }
                  type="button"
                  onClick={ this.selectAnswer }
                  disabled={ disabledAnswer }
                  className={ answer === correctAnswer
                    ? `correct-answer ${trueAnswer}`
                    : `wrong-answer ${wrongOne}` }
                  data-testid={ answer === correctAnswer
                    ? 'correct-answer'
                    : `wrong-answer${index}` }
                >
                  { answer }
                </button>
              ))
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

const mapStateToProps = (state) => ({
  token: state.token,
  quiz: state.quiz,
});

const mapDispatchToProps = (dispatch) => ({
  getToken: () => dispatch(actionGetToken()),
  saveScore: (score) => dispatch(actionSaveScore(score)),
});

Game.defaultProps = {
  quiz: {},
};

Game.propTypes = {
  getToken: propTypes.func.isRequired,
  quiz: propTypes.shape({
    results: propTypes.arrayOf(propTypes.object),
    response_code: propTypes.number,
  }),
  // saveScore: propTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
