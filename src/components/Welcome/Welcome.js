import React, { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Navigate } from "react-router-dom";

const Welcome = () => {
    
    const [redirect, setRedirect] = useState(false)


    const handleClick = () => {
       setRedirect(true);
    }
    if(redirect){
        return <Navigate to='/Compose'></Navigate>
    }

    return (
        <Container className="mt-5">
        <Row className="justify-content-center">
          <Col md={8} className="text-center">
            <p>Welcome to mail-client box</p>
            <Button variant="primary" onClick={handleClick}>
              Compose Mail
            </Button>
          </Col>
        </Row>
      </Container>
    )
}

export default Welcome;