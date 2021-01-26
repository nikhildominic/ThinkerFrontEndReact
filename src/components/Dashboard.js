import React, { useEffect, useRef, useState } from "react";

import { Form, Card, Button, Alert } from "react-bootstrap";

import { Link, useHistory } from "react-router-dom";

import actions from "../utils/actions";

export default function Dashboard() {
  const idRef = useRef();
  const history = useHistory();
  const [content, setContent] = useState("");

  function handleLogout() {
    localStorage.removeItem("user");
    history.push("/login");
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await actions
        .putCurrent(idRef.current.value)
        .then((response) => {
          setContent({
            identifier: response.data.identifier,
          });
        })
        .catch((err) => {
          console.log(err);
          setError("Update failed");
        });
      setLoading(false);
    } catch {
      setError("Failed to update");
    }
    setLoading(false);
  }

  async function handleNext(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await actions
        .nextId()
        .then((response) => {
          setContent(
            response.data,
          );
        })
        .catch((err) => {
          console.log(err);
          setError("Update failed");
        });
      setLoading(false);
    } catch {
      setError("Failed to update");
    }
    setLoading(false);
  }

  const user = localStorage.getItem("user");
  if (!user) {
    history.push("/login");
  }

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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
          <h2 className="text-center mb-4">Current Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <strong>Thniker: </strong>
          {content.fullname}
          <br />
          <strong>Identifier: </strong>
          {content.identifier}
        </Card.Body>
      </Card>

      <Card>
        <Form onSubmit={handleSubmit}>
          <h2 className="text-center mb-4">Update Identifier</h2>
          <Form.Group id="identifier">
            <Form.Label>New Identifier</Form.Label>
            <Form.Control type="number" ref={idRef} required />
          </Form.Group>
          <Button type="submit" className="w-100" disabled={loading}>
            Update
          </Button>
        </Form>
        
		<Card>
          <h2 className="text-center mb-4">Next Identifier</h2>

          <Button varient="link" onClick={handleNext}>
            Generate Next
          </Button>
        </Card>
      </Card>

      <div className="w-100 text-center mt-2">
        <Button varient="link" onClick={handleLogout}>
          Log Out
        </Button>
      </div>
    </>
  );
}
