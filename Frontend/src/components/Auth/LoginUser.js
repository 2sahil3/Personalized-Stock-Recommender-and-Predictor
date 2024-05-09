// LoginForm.js
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "./AuthContext.js";

const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', {
                username: username,
                password: password
            });
            if(response.status === 200)
            {   
                const token = response.data.token;
                localStorage.setItem('token', token); // Store token in localStorage
                await login({ username });
                navigate('/home');
            }
            else{
                console.log("Log in failed see below for error:");
                console.log(response.data);
            }
            console.log(response);
            
        } catch (error) {
            console.error('Login error:', error);
           
        }
    };

    return (
        <Container className="mt-5 p-5 border border-dark rounded w-50">
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

                        <Button variant="primary" onClick={handleLogin}>
                            Login
                        </Button>

                        <div className="mt-3 d-flex justify-content-between">
                            <span><a href="/signin">Sign In!</a></span>
                            <span className="float-right"><a href="/forgot-password">Forgot password?</a></span>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default Login;
