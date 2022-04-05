const INITIAL_STATE = {
  player: {
    name: '',
    assertions: '',
    score: 0,
    gravatarEmail: '',
  },
  token: '',
};

const playerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  default:
    return state;
  }
};

export default playerReducer;
