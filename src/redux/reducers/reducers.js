import { combineReducers } from 'redux';
import player from './player';
import token from './token';
import quiz from './quiz';

const rootReducer = combineReducers({
  player,
  token,
  quiz,
});

export default rootReducer;
