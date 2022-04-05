import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from '../reducers/reducer';

const store = createStore(rootReducer, composeWithDevTools());

if (window.Cypress) {
  window.store = store;
}

export default store;
