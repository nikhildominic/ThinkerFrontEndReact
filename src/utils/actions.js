import axios from "axios";
 


const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem("user")}` }
};



const getCurrent = () => {
	return axios.get(process.env.REACT_APP_GETCURRENT, config);
  };



  const nextId = () => {
	  console.log("next",config);
	return axios.get(process.env.REACT_APP_NEXTID, config);
  };


  const putCurrent = (identifier) => {
	  const body = {identifier};
	  console.log(JSON.stringify(config));
	  console.log(JSON.stringify(body));
	return axios.put(process.env.REACT_APP_GETCURRENT,body, config, );
  };
  



export default {
	getCurrent,
	putCurrent,
	nextId
  };