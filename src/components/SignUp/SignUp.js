import React, { useState } from "react";
import { Button, Card, Container, Form, Row, Col } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

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
        }).then((res) => {
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
    };

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
            <Row className="w-10">
                <Col >
                    <Card>
                        <Card.Body>
                            <h2 className="text-center mb-4">Sign Up</h2>
                            <Form onSubmit={formHandler}>
                                <Form.Group controlId="formBasicEmail" className="mb-3">
                                    <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)}/>
                                </Form.Group>
                                <Form.Group controlId="formBasicPassword" className="mb-3">
                                    <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
                                </Form.Group>
                                <Form.Group controlId="formConfirmPassword" className="mb-3">
                                    <Form.Control type="password" placeholder="Confirm Password" />
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

// import { Button, Card, Container, Form } from "react-bootstrap";

// const SignUp = () => {
//     return (
//         <Card>
//             <Card.Body>
//             <Container>
//             <Form>
//                 <Form.Group controlId="formBasicEmail" className="mb-3">
//                     <Form.Label>Email address</Form.Label>
//                     <Form.Control type="email" placeholder="Enter email" />
//                 </Form.Group>
//                 <Form.Group controlId="formBasicPassword" className="mb-3">
//                     <Form.Label>Password</Form.Label>
//                     <Form.Control type="password" placeholder="Password" />
//                 </Form.Group>
//                 <Form.Group className="mb-3">
//                     <Form.Label>Confirm Password</Form.Label>
//                     <Form.Control type="password" placeholder="Confirm Password" />
//                 </Form.Group>
//                 <Button type="submit" variant="primary">Sign Up</Button>
//             </Form>
//         </Container>
//             </Card.Body>
//         </Card>
//     );
// }

// export default SignUp;
