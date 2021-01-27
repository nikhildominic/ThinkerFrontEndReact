import axios from "axios";

// const config = {
//   headers: { Authorization: `Bearer ${localStorage.getItem("user")}` },
// };

const getCurrent = (token) => {
  console.log("current");
  return axios.get(process.env.REACT_APP_GETCURRENT, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

const nextId = (token) => {
  console.log("next");
  return axios.get(process.env.REACT_APP_NEXTID, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

const putCurrent = (identifier, token) => {
  const body = { identifier };
  return axios.put(process.env.REACT_APP_GETCURRENT, body, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export default {
  getCurrent,
  putCurrent,
  nextId,
};
