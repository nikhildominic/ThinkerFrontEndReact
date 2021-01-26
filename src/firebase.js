import axios from "axios";

const register = (fullname, email, password) => {
  return axios.post(process.env.REACT_APP_SIGNUP, {
    email,
    password,
    fullname
  })
  .then((response) => {
    console.log(response);
    if (response.data.token) {
      localStorage.setItem("user", JSON.stringify(response.data.token));
    }

    return response.data;
  });
};

const login = (email, password) => {
  return axios
    .post(REACT_APP_SIGNIN, {
      email,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data.token));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

export default {
  register,
  login,
  logout,
};
