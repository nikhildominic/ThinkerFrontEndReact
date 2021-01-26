import React, {useRef, useState} from "react";
import { Form, Button, Card, Alert} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css'
import {Link, useHistory} from 'react-router-dom'


import {useAuth} from '../context/AuthContext'

export default function Login() {
	const emailRef = useRef();
	const passwordRef = useRef();
	const {login} = useAuth();
	const [error,setError]  = useState('')
	const [loading,setLoading]  = useState(false)
	const history = useHistory();
	
	const [currentUser, setCurrentUser] = useState()
	


	async function handleSubmit(e){
		e.preventDefault()

		try{
			setError('');
			setLoading(true);
			await login(emailRef.current.value,passwordRef.current.value)
			.then(response=>{
				setCurrentUser(response.data.token)
				localStorage.setItem("user", response.data.token);
				history.push("/")
			})
		}
		catch{
			setError("Failed to sign in")
		}
		setLoading(false);
		
	}

  return (
    <>
      <Card>
		<Card.Body>
		<h2 className = "text-center mb-4">Log In</h2>
		{JSON.stringify(currentUser)}
		{error && <Alert variant = "danger">{error}</Alert>}
		<Form onSubmit = {handleSubmit}>
			<Form.Group id="email">
				<Form.Label>Email</Form.Label>
				<Form.Control type="email" ref ={emailRef} required/>
			</Form.Group>
			<Form.Group id="password">
				<Form.Label>Password</Form.Label>
				<Form.Control type="password" ref ={passwordRef} required/>
			</Form.Group>
			<Button type="submit" className="w-100" disabled = {loading}>Login</Button>
		</Form>	
		</Card.Body>	

	  </Card>
      <div className="w-100 text-center mt-2">
        New Here? <Link to = "/signup">Sign up</Link>
      </div>
    </>
  );
}
