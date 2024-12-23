import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '', role: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (credentials.email && credentials.password && credentials.role) {
      try {
        // Make the API call to the backend to authenticate
        const response = await axios.post('http://localhost:8000/login/', {
          email: credentials.email,
          password: credentials.password,
          role: credentials.role,
        });

        const { role } = response.data;

        // Based on the role, navigate to the correct dashboard
        switch (role) {
            case 'Admin':
              navigate('/admin-dashboard');
              break;
            case 'Teacher':
              navigate('/teacher-dashboard');
              break;
            case 'Student':
              navigate('/student-dashboard');
              break;
            default:
              setError('Invalid role');
            }
        } catch (err) {
          setError(err.response?.data?.message || 'Invalid credentials');
        }
      } else {
        setError('Please fill in all fields');
      }
    };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="p-4 shadow" style={{ backgroundColor: '#f8d7da' }}>
            <Card.Title className="text-center mb-4">Login to LMS</Card.Title>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={credentials.email}
                  onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={credentials.password}
                  onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Role</Form.Label>
                <Form.Select
                  value={credentials.role}
                  onChange={(e) => setCredentials({ ...credentials, role: e.target.value })}
                >
                  <option value="">Select Role</option>
                  <option value="Admin">Admin</option>
                  <option value="Teacher">Teacher</option>
                  <option value="Student">Student</option>
                </Form.Select>
              </Form.Group>
              <Button variant="danger" type="submit" className="w-100">
                Login
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
