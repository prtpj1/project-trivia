import fetchToken from '../../services';

export const EMAIL = 'EMAIL';
export const USER = 'USER';
export const SAVE_TOKEN = 'SAVE_TOKEN';

export const actionSaveToken = (token) => ({
  type: SAVE_TOKEN,
  token,
});

export const setUser = (user) => ({
  type: USER,
  user,
});

export const setEmail = (email) => ({
  type: EMAIL,
  email,
});

export const actionGetToken = () => async (dispatch) => {
  const token = await fetchToken();
  dispatch(actionSaveToken(token));
};
