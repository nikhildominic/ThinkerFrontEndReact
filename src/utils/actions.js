import axios from "axios";
 

import authHeader from './auth-header'

const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem("user")}` }
};



const getCurrent = () => {
	return axios.get(process.env.REACT_APP_GETCURRENT, config);
  };
  

const logout = () => {
  localStorage.removeItem("user");
};

export default {
	getCurrent,
	logout
  };