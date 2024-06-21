import React, { useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { myAction } from "../../store/store";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);

    const dispatch = useDispatch();

    const formHandler = (e) => {
        e.preventDefault();
        dispatch(myAction.setSender(email))

        fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBP9iT5A1bLKRM74yumPNG4oGfKt3T4pGM',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                    email: email,
                    password: password,
                    returnSecureToken: true
            })
        }).then((res) => {
            if(res.ok){
                return res.json();
            } else {
                return res.json().then((data) => {
                    throw new Error(data.error.message);
                })
            }
        }).then((data) => {
            console.log(data);
            setRedirect(true)
        }).catch((error) => {
            alert(error);
        })
        setEmail('');
        setPassword('');
    };
    if(redirect){
        return <Navigate to='/Welcome'></Navigate>
    }


    return (
        <Container className="d-flex justify-content-center align-items-center" style={{height: '100vh', backgroundColor: 'lightblue'}}>
            <Row className="w-10">
                <Col >
                    <Card>
                        <Card.Body style={{borderColor: 'lightgray'}}>
                            <h2 className="text-center mb-4">Login</h2>
                            <Form onSubmit={formHandler} >
                                <Form.Group controlId="formBasicEmail" className="mb-3">
                                    <Form.Control style={{borderColor: 'black', color: 'black'}} value={email} type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)}/>
                                </Form.Group>
                                <Form.Group controlId="formBasicPassword" className="mb-3">
                                    <Form.Control style={{borderColor: 'black', color: 'black'}} value={password} type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
                                </Form.Group>
                                <Button type="submit" variant="primary" className="w-100 mb-3" style={{borderRadius: '5rem'}}>Login</Button>

                                <Link className="align-items-center">Forget Password....</Link>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
                 
            </Row>
           
          
        </Container>
    );
}

export default Login;