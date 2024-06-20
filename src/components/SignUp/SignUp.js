import React, { useState } from "react";
import { Button, Card, Container, Form, Row, Col } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navigate } from "react-router-dom";

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);

    const formHandler = (e) => {
        e.preventDefault();
        fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBP9iT5A1bLKRM74yumPNG4oGfKt3T4pGM',{
            method: 'POST',
            body: JSON.stringify({
                email:email,
                password:password,
                returnSecureToken: true
            }),
            headers:{
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            if(res.ok){
                return res.json();
            } 
            else {
                 return res.json().then((data) => {
                        let errorMessage = 'Authentication failed';
                        if(data && data.error && data.error.message){
                            errorMessage = data.error.message;
                          }
                      throw new Error(errorMessage);
                });
            }
        }).then((data) => {
            console.log(data);
        }).catch((error) => {
            console.log(error);
            alert(error.message)
        })
        setEmail('');
        setPassword('');
        setRedirect(true);
    };

    if(redirect){
        return <Navigate to='/Login'></Navigate>
    }

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{height: '100vh', backgroundColor: 'lightblue'}}>
            <Row className="w-10">
                <Col >
                    <Card>
                        <Card.Body style={{borderColor: 'lightgray'}}>
                            <h2 className="text-center mb-4">Sign Up</h2>
                            <Form onSubmit={formHandler} >
                                <Form.Group controlId="formBasicEmail" className="mb-3">
                                    <Form.Control value={email} type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)}/>
                                </Form.Group>
                                <Form.Group controlId="formBasicPassword" className="mb-3">
                                    <Form.Control value={password} type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
                                </Form.Group>
                                <Form.Group controlId="formConfirmPassword" className="mb-3">
                                    <Form.Control value={password} type="password" placeholder="Confirm Password" />
                                </Form.Group>
                                <Button type="submit" variant="primary" className="w-100">Sign Up</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
                 
            </Row>
           
          
        </Container>
    );
}

export default SignUp;
