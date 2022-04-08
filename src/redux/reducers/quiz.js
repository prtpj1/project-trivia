import { SAVE_QUIZ } from '../actions/actions';

const INITIAL_STATE = {
  response_code: 0,
  results: [],
};

const quiz = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_QUIZ:
    return {
      ...state,
      response_code: action.quiz.response_code,
      results: action.quiz.results,
    };
  default:
    return state;
  }
};

export default quiz;
