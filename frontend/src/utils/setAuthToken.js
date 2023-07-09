import axios from 'axios';

const setAuthToken = token => {
  if (token) {
    axios.defaults.headers.common['x-auth-token'] = token;
    axios.defaults.headers.common['Content-Type'] = 'application/json; charset=utf-8';
    localStorage.setItem('token', token);
    console.log("AXIOS",axios.defaults.headers);
  } else {
    console.log("no token is ", token);
    delete axios.defaults.headers.common['x-auth-token'];
    localStorage.removeItem('token');
  }
};

export default setAuthToken;
