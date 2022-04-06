import { EMAIL, USER } from '../actions/actions';

const INITIAL_STATE = {
  name: '',
  assertions: '',
  score: 0,
  gravatarEmail: '',
};

const playerReducer = (state = INITIAL_STATE, action) => {
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
  default:
    return state;
  }
};

export default playerReducer;
