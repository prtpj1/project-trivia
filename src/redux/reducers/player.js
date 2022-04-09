import { EMAIL, SUM_ASSERTIONS, USER } from '../actions/actions';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case EMAIL:
    return {
      ...state,
      gravatarEmail: action.email,
    };
  case USER:
    return {
      ...state,
      name: action.user,
    };
  case 'SAVE_SCORE':
    return {
      ...state,
      score: state.score + action.score,
    };
  case SUM_ASSERTIONS:
    return {
      ...state,
      assertions: action.assertions,
    };
  default:
    return state;
  }
};

export default player;
