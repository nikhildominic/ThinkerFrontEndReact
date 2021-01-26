import React, {useEffect, useState}from 'react'

import {Card,Button,Alert} from 'react-bootstrap'

import {Link, useHistory} from 'react-router-dom'

import actions from "../utils/actions";


export default function Dashboard() {
	const history = useHistory();
	const [content, setContent] = useState("");
	function handleLogout() {
		localStorage.removeItem("user")
	}
	const [error, setError] = useState("");
	const currentUser =localStorage.getItem("user");
	
	
		useEffect(() => {
			actions.getCurrent().then(
			  (response) => {
				setContent(response.data);
			  },
			  (error) => {
				const _content =
				  (error.response &&
					error.response.data &&
					error.response.data.message) ||
				  error.message ||
				  error.toString();
				setContent(_content);
			  }
			);
		  }, []);
	

	return (
		<>
		 <Card>
		 <Card.Body>
			<h2 className = "text-center mb-4">Profile</h2>
			{error && <Alert variant = "danger">{error}</Alert>}
			<strong>Thniker: </strong>{content.fullname}<br/>
			<strong>Identifier: </strong>{content.identifier}
			<Link to="/update-profile" className="btn btn-priary w-100 mt-3"> Update Identifier</Link>
		</Card.Body>		

		 </Card>
		 <div className="w-100 text-center mt-2">
			<Button varient="link" onClick={handleLogout}>Log Out</Button>
			</div>	
		</>
	)
}
