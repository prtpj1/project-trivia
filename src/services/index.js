const fetchToken = async () => {
  const URL = 'https://opentdb.com/api_token.php?command=request';
  const response = await fetch(URL);
  const JSON = await response.json();
  return JSON.token;
};

export const fetchAvatar = async (hashEmail) => {
  const URL = `https://www.gravatar.com/avatar/${hashEmail}`;
  const response = await fetch(URL);
  const data = await response.json();
  console.log(data);
  return data;
};

export default fetchToken;
