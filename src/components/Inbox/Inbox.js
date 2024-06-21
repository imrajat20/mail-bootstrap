// import React, { useState, useEffect } from "react";
// import { Container, Button, ListGroup } from "react-bootstrap";
// import { Link, Navigate } from "react-router-dom";

// const Inbox = () => {
//   const [emails, setEmails] = useState([]);
//   const [redirect, setRedirect] = useState(false);

//   useEffect(() => {
//     fetch('https://mail-client-68ac0-default-rtdb.firebaseio.com/emails.json')
//       .then((response) => response.json())
//       .then((data) => {
//         if (data) {
//           const fetchedEmails = Object.keys(data).map((key) => ({
//             id: key,
//             ...data[key]
//           }));
//           setEmails(fetchedEmails);
//         }
//       })
//       .catch((error) => console.error("Error fetching emails: ", error));
//   }, []);

//   const buttonHandler = () => {
//     setRedirect(true);
//   }

//   if(redirect){
//     return <Navigate to='/ComposeEmail'></Navigate>
//   }

//   return (
//     <Container>
//       <h2>Inbox</h2>
//       <Button as={Link} to="/compose" className="mb-3" onClick={buttonHandler}>
//         Compose
//       </Button>
//       <ListGroup>
//         {emails.map((email) => (
//           <ListGroup.Item key={email.id}>
//             <strong>From: </strong> {email.sender}
//             <br />
//             <strong>Subject: </strong> {email.subject}
//             <br />
//             <strong>Body: </strong> {email.body}
//           </ListGroup.Item>
//         ))}
//       </ListGroup>
//     </Container>
//   );
// };

// export default Inbox;
import React, { useState, useEffect } from "react";
import { Container, Button, ListGroup, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navigate } from "react-router-dom";

const firebaseConfig = {
  databaseURL: "https://mail-client-68ac0-default-rtdb.firebaseio.com"
};

const Inbox = () => {
  const [emails, setEmails] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [redirect, setRedirect] = useState(false);

  const handleButton = () => {
    setRedirect(true);
  }

  useEffect(() => {
    fetch(`${firebaseConfig.databaseURL}/emails.json`)
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

  const handleEmailClick = (email) => {
    setSelectedEmail(email);
  };

  const handleCloseEmailDetails = () => {
    setSelectedEmail(null);
  };

  if(redirect){
    return <Navigate to='/Compose'></Navigate>
  }

  return (
    <Container>
      <h2>Inbox</h2>
      <Button onClick={handleButton} className="mb-3">
        Compose
      </Button>
      <ListGroup>
        {emails.map((email) => (
          <ListGroup.Item key={email.id} action onClick={() => handleEmailClick(email)}>
            <strong>From: </strong> {email.email} | <strong>Subject: </strong> {email.subject}
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

