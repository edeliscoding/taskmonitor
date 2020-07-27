import axios from "axios";

//set token to global headers
const setAuthToken = token => {
  if (token) {
    axios.defaults.headers.common["auth-token"] = token;
  } else {
    delete axios.defaults.headers.common["auth-token"];
  }
};

export default setAuthToken;
