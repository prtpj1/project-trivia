import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import Header from '../components/Header';
import { actionGetToken } from '../redux/actions/actions';

class Game extends Component {
  constructor() {
    super();
    this.state = {
      count: 0,
      correctAnswer: '',
      wrongAnswers: [],
    };
  }

  componentDidMount = async () => {
    const interval = 5000;
    await this.validateToken();
    setInterval(this.updateQuiz, interval);
    this.createButtons();
  }

  componentDidUpdate() {
    const four = 4;
    const { count } = this.state;
    if (count === four) {
      clearInterval(this.updateQuiz);
    }
    // this.createButtons();
  }

  validateToken = async () => {
    const { getToken, quiz } = this.props;
    const three = 3;
    if (quiz.response_code === three) {
      getToken();
    }
  }

  updateQuiz = () => {
    const { count } = this.state;
    const four = 4;
    if (count === four) {
      clearInterval(this.updateQuiz);
      return;
    }
    this.setState({
      count: count + 1,
    });
    this.createButtons();
  }

  createButtons = () => {
    const { count } = this.state;
    const { quiz } = this.props;
    const answers = [...quiz.results[count].incorrect_answers,
      quiz.results[count].correct_answer].sort();
    const correct = quiz.results[count].correct_answer;
    this.setState({
      correctAnswer: correct,
      wrongAnswers: answers,
    });
  }

  render() {
    const { count, wrongAnswers, correctAnswer } = this.state;
    const { quiz } = this.props;
    let insideCount = 0;
    const nRand = 0.5;

    return (
      <div>
        <Header />
        <div>
          <h1 data-testid="question-category">{ quiz.results[count].category }</h1>
          <p data-testid="question-text">{ quiz.results[count].question }</p>
          <div data-testid="answer-options">
            {
              wrongAnswers.sort(() => nRand - Math.random()).map((answer, index) => {
                // randomizacao da array retirado de https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
                insideCount += 1;
                if (answer === correctAnswer) {
                  insideCount -= 1;
                  return (
                    <button
                      key={ index }
                      type="button"
                      data-testid="correct-answer"
                    >
                      { answer }
                    </button>
                  );
                }
                return (
                  <button
                    key={ index }
                    type="button"
                    data-testid={ `wrong-answer-${insideCount - 1}` }
                  >
                    { answer }
                  </button>
                );
              })
            }
          </div>
        </div>
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
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
