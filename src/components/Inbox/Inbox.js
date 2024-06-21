import React, { useState, useEffect } from "react";
import { Container, Button, ListGroup } from "react-bootstrap";
import { Link, Navigate } from "react-router-dom";

const Inbox = () => {
  const [emails, setEmails] = useState([]);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    fetch('https://mail-client-68ac0-default-rtdb.firebaseio.com/emails.json')
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          const fetchedEmails = Object.keys(data).map((key) => ({
            id: key,
            ...data[key]
          }));
          setEmails(fetchedEmails);
        }
      })
      .catch((error) => console.error("Error fetching emails: ", error));
  }, []);

  const buttonHandler = () => {
    setRedirect(true);
  }

  if(redirect){
    return <Navigate to='/ComposeEmail'></Navigate>
  }

  return (
    <Container>
      <h2>Inbox</h2>
      <Button as={Link} to="/compose" className="mb-3" onClick={buttonHandler}>
        Compose
      </Button>
      <ListGroup>
        {emails.map((email) => (
          <ListGroup.Item key={email.id}>
            <strong>email: </strong> {email.email}
            <br />
            <strong>Subject: </strong> {email.subject}
            <br />
            <strong>Body: </strong> {email.body}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
};

export default Inbox;
