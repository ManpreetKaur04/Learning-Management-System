import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Alert } from 'react-bootstrap';

const AddUser = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Student'); // Default role
  const [message, setMessage] = useState(null); // For showing success/error messages

  const handleSubmit = (e) => {
    e.preventDefault();

    const userData = {
      username,
      email,
      password,
      role
    };

    axios
      .post('http://localhost:8000/api/add_user/', userData)
      .then((response) => {
        setMessage({ type: 'success', text: 'User added successfully' });
        setUsername('');
        setEmail('');
        setPassword('');
        setRole('Student');
      })
      .catch((error) => {
        setMessage({ type: 'danger', text: 'Failed to add user' });
      });
  };

  return (
    <div>
      <h3>Add New User</h3>
      {message && <Alert variant={message.type}>{message.text}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="role">
          <Form.Label>Role</Form.Label>
          <Form.Control
            as="select"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="Teacher">Teacher</option>
            <option value="Student">Student</option>
          </Form.Control>
        </Form.Group>

        <Button variant="danger" type="submit">
          Add User
        </Button>
      </Form>
    </div>
  );
};

export default AddUser;
