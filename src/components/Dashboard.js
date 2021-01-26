import React, {useState}from 'react'

import {Card,Button,Alert} from 'react-bootstrap'






export default function Dashboard() {
	function handleLogout() {
	
	}
	const [error, setError] = useState("");

	return (
		<>
		 <Card>
		 <Card.Body>
			<h2 className = "text-center mb-4">Profile</h2>
			{error && <Alert varient = "danger">{error}</Alert>}
		</Card.Body>		

		 </Card>
		 <div className="w-100 text-center mt-2">
			<Button varient="link" onClick={handleLogout}>Log Out</Button>
			</div>	
		</>
	)
}
