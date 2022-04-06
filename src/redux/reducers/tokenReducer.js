import { SAVE_TOKEN } from '../actions/actions';

let INITIAL_STATE = '';

const handleToken = (token) => {
  INITIAL_STATE = token;
  return INITIAL_STATE;
};

const token = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_TOKEN: return handleToken(action.token);
  default:
    return state;
  }
};

export default token;
