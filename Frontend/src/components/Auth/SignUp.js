// SignupForm.js

import React, { useState } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [capital, setCapital] = useState('');

    const handleSignup = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/auth/signin', {
                username: username,
                password: password,
                capital: capital,
                email:email
            });
            console.log('Signup success:', response);
            return <Navigate to="/login" />;
            // Redirect to login page or perform other actions upon successful signup
        } catch (error) {
            console.error('Signup error:', error.response.data.error);
            // Handle signup error, show error message to user
        }
    };

    return (
        <Container className="mt-5 p-4 border border-dark w-50">
            <Row className="justify-content-md-center">
                <Col md={6}>
                    <Form>
                        <Form.Group controlId="formUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter your username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="formPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="formEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="formCapital">
                            <Form.Label>Capital Value</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter your capital value"
                                value={capital}
                                onChange={(e) => setCapital(e.target.value)}
                            />
                        </Form.Group>

                        <Button variant="primary" onClick={handleSignup}>
                            Sign Up
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default Signup;
