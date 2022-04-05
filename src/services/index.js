const fetchToken = async () => {
  const URL = 'https://opentdb.com/api_token.php?command=request';
  const response = await fetch(URL);
  const JSON = await response.json();
  return JSON.token;
};

export default fetchToken;
