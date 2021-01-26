import React, { useContext, useState } from 'react'
import axios from "axios";


const AuthContext = React.createContext()

export function useAuth(){
	return useContext(AuthContext)
}


function signup(email, password, fullname){
	return axios.post(process.env.REACT_APP_SIGNUP, {
		email,
		password,
		fullname
	  })
}

function login(email, password){
	return axios.post(process.env.REACT_APP_SIGNIN, {
		email,
		password
	  })
}

export function AuthProvider({children}) {

	const [currentUser, setCurrentUser] = useState()
	
	const value = {
		currentUser,
		login,
		signup
	}


	return (
		<AuthContext.Provider value = {value}>
			{children}
		</AuthContext.Provider>
	)
}
