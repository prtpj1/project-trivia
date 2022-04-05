import fetchToken from '../../services/index';

export const actionSaveToken = (token) => ({
  type: 'SAVE_TOKEN',
  token,
});

export const actionGetToken = () => async (dispatch) => {
  const token = await fetchToken();
  dispatch(actionSaveToken(token));
};
