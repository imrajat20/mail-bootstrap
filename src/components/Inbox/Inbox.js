import React, { useState, useEffect } from "react";
import { Container, Button, ListGroup, Modal, Navbar, Badge} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, Navigate } from "react-router-dom";

const firebaseConfig = {
  databaseURL: "https://mail-client-68ac0-default-rtdb.firebaseio.com"
};

const Inbox = () => {
  const [emails, setEmails] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [redirect, setRedirect] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  const handleButton = () => {
    setRedirect(true);
  }

  const fetchEmails = async () => {
    try {
      const response = await fetch(`${firebaseConfig.databaseURL}/emails.json`);
      const data = await response.json();
      if (data) {
        const fetchedEmails = Object.keys(data).map((key) => ({
          id: key,
          ...data[key]
        }));
        setEmails(fetchedEmails);

        // Calculate the number of unread emails
        const unreadEmails = fetchedEmails.filter((email) => !email.read).length;
        setUnreadCount(unreadEmails);
      }
    } catch (error) {
      console.error("Error fetching emails: ", error);
    }
  };

  useEffect(() => {
    fetchEmails();

    const intervalId = setInterval(fetchEmails, 2000);
    return () => clearInterval(intervalId);
  }, []);

  const handleEmailClick = (email) => {
    setSelectedEmail(email);

    if (!email.read) {
      fetch(`${firebaseConfig.databaseURL}/emails/${email.id}.json`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ read: true })
      })
      .then((response) => {
        if (response.ok) {
          setEmails((prevEmails) =>
            prevEmails.map((e) =>
              e.id === email.id ? { ...e, read: true } : e
            )
          );
        }
      })
      .catch((error) => console.error("Error marking email as read: ", error));
    }
  };

  const handleCloseEmailDetails = () => {
    setSelectedEmail(null);
  };

  const deleteHandler = (emailId) => {
    fetch(`${firebaseConfig.databaseURL}/emails/${emailId}.json`, {
      method: 'DELETE'
    })
    .then((response) => {
      if (response.ok) {
        setEmails((prevEmails) => prevEmails.filter(email => email.id !== emailId));
      } else {
        console.error("Failed to delete email");
      }
    })
    .catch((error) => console.error("Error deleting email: ", error));
  };

 
  if(redirect){
    return <Navigate to='/Compose'></Navigate>
  }

  return (
    <Container>
      <Navbar style={{background: 'blue'}} >
        <Container>
          <Navbar.Brand style={{color: 'white', marginLeft: '5rem', padding: '1rem'}}>My Emails</Navbar.Brand>
        </Container>
      </Navbar>
      <h2 style={{ background: 'lightgray'}}>Inbox</h2>
      <h2 style={{ background: 'lightgray'}}>
        <Link to='/SentMails'> Sent</Link>
      </h2>
      
      <Button onClick={handleButton} className="mb-3">
        Compose
      </Button>
      <h4>Unread Emails: {unreadCount}</h4>
      <ListGroup>
        {emails.map((email) => (
          <ListGroup.Item key={email.id} action onClick={() => handleEmailClick(email)}>
            {!email.read && <Badge bg="primary" pill className="mr-2">new</Badge>}
            <strong>From: </strong> {email.sender} | <strong>Subject: </strong> {email.subject}
            <Button variant="danger" className="ml-3" onClick={() => deleteHandler(email.id)}>Delete</Button>
          </ListGroup.Item>
        ))}
      </ListGroup>

      {/* Email Details Modal */}
      <Modal show={selectedEmail !== null} onHide={handleCloseEmailDetails}>
        <Modal.Header closeButton>
          <Modal.Title>Email Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <strong>From: </strong> {selectedEmail?.email}
          <br />
          <strong>Subject: </strong> {selectedEmail?.subject}
          <br />
          <strong>Body: </strong>
          <p>{selectedEmail?.body}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEmailDetails}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Inbox;

