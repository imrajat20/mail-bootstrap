import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useSelector } from "react-redux";

const ComposeEmail = () => {
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [body, setBody] = useState('');

    const sender = localStorage.getItem('sender');

    const formHandler = (e) => {
        e.preventDefault();
        fetch('https://mail-client-68ac0-default-rtdb.firebaseio.com/emails.json',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                subject,
                body,
                sender
            })
        }).then((res) => {
            if(res.ok){
                return res.json();
            }else {
                return res.json().then((data) => {
                    throw new Error(data.error.message);
                });
            }
        }).then((data) => {
            console.log(data);
        }).catch((error) => {
            alert(error);
        })
        setBody('');
        setEmail('');
        setSubject('');
    };


    return (
        <Container>
            <Form onSubmit={formHandler}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>To</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} required/>
                </Form.Group>
                <Form.Group controlId="formBasicSubject">
                    <Form.Label>Subject</Form.Label>
                    <Form.Control type="text" placeholder="Enter subject" onChange={(e) => setSubject(e.target.value)} required/>
                </Form.Group>
                <Form.Group controlId="body">
                    <Form.Label>Body</Form.Label>
                    <Form.Control as="textarea" rows={3} onChange={(e) => setBody(e.target.value)} required/>
                    
                </Form.Group>

                <Button type="submit">send</Button>
            </Form>
        </Container>
    );
};

export default ComposeEmail;