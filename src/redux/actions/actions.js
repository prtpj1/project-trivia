import fetchToken from '../../services';

export const EMAIL = 'EMAIL';
export const USER = 'USER';
export const SAVE_TOKEN = 'SAVE_TOKEN';
export const SAVE_QUIZ = 'SAVE_QUIZ';

export const actionSaveToken = (token) => ({
  type: SAVE_TOKEN,
  token,
});

export const actionSaveQuiz = (quiz) => ({
  type: SAVE_QUIZ,
  quiz,
});

export const setUser = (user) => ({
  type: USER,
  user,
});

export const setEmail = (email) => ({
  type: EMAIL,
  email,
});

export const actionSaveScore = (score) => ({
  type: 'SAVE_SCORE',
  score,
});

export const actionGetToken = () => async (dispatch) => {
  const token = await fetchToken();
  dispatch(actionSaveToken(token));
  const URL = `https://opentdb.com/api.php?amount=5&token=${token}`;
  const response = await fetch(URL);
  const JSON = await response.json();
  dispatch(actionSaveQuiz(JSON));
};
