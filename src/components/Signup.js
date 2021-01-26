import React, {useRef, useState} from "react";
import { Form, Button, Card, Alert} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css'
import {Link, useHistory} from 'react-router-dom'
import {useAuth} from '../context/AuthContext'

export default function Signup() {
	const emailRef = useRef();
	const passwordRef = useRef();
	const fullnameRef = useRef();
	const {signup} = useAuth();
	const [error,setError]  = useState('')
	
	const [loading,setLoading]  = useState(false)
	const [currentUser, setCurrentUser] = useState()
	const history = useHistory();
	async function handleSubmit(e){
		e.preventDefault()

		try{
			setError('');
			setLoading(true);
			await signup(emailRef.current.value,passwordRef.current.value,fullnameRef.current.value)
			.then(response=>{
				setCurrentUser(response.data.token)
				localStorage.setItem("user", response.data.token);
				history.push("/")
			})
		}
		catch{
			setError("Failed to signup")
		}
		setLoading(false);
		
	}

  return (
    <>
      <Card>
		<Card.Body>
		<h2 className = "text-center mb-4">Sign Up</h2>
		{JSON.stringify(currentUser)}
		{error && <Alert varient = "danger">{error}</Alert>}
		<Form onSubmit = {handleSubmit}>
			<Form.Group id="email">
				<Form.Label>Email</Form.Label>
				<Form.Control type="email" ref ={emailRef} required/>
			</Form.Group>
			<Form.Group id="password">
				<Form.Label>Password</Form.Label>
				<Form.Control type="password" ref ={passwordRef} required/>
			</Form.Group>
			<Form.Group id="fullname">
				<Form.Label>Full Name</Form.Label>
				<Form.Control type="text" ref ={fullnameRef} required/>
			</Form.Group>
			<Button type="submit" className="w-100" disabled = {loading}>Sign Up</Button>
		</Form>	
		</Card.Body>	

	  </Card>
      <div className="w-100 text-center mt-2">
        Already have an account? <Link to = "/login">Login</Link>
      </div>
    </>
  );
}
