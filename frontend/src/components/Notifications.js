import React, { useState, useEffect } from 'react';
import { ListGroup, Button, Form, Alert, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Notifications = ({ userRole }) => {
  const [notifications, setNotifications] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();  // To redirect if necessary

  // Fetch existing notifications when the component mounts
  useEffect(() => {
    setLoading(true);
    axios.get('http://localhost:8000/get_notifications/')
      .then((response) => {
        setNotifications(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError('Error fetching notifications');
        setLoading(false);
      });
  }, []);

  const handleInputChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!message) {
      setError('Message cannot be empty!');
      return;
    }

    setLoading(true);
    // Sending the notification message to the backend
    axios.post('http://localhost:8000/send_notification/', { message })
      .then((response) => {
        setNotifications((prevNotifications) => [...prevNotifications, { message }]);
        setMessage('');
        setError(null);
        setLoading(false);
      })
      .catch((error) => {
        setError('Error sending notification');
        setLoading(false);
      });
  };

  return (
    <div>
      <h3>Notifications</h3>

      {/* Error message display */}
      {error && <Alert variant="danger">{error}</Alert>}

      {/* Show notification creation form only for Admin */}
      {userRole === 'admin' && (
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="messageInput">
            <Form.Label>Enter your message</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter notification message"
              value={message}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Button variant="danger" type="submit" disabled={loading}>
            {loading ? <Spinner as="span" animation="border" size="sm" /> : 'Send Notification'}
          </Button>
        </Form>
      )}

      {/* List of notifications */}
      {loading ? (
        <Spinner animation="border" />
      ) : (
        <ListGroup>
          {notifications.map((notification, index) => (
            <ListGroup.Item key={index}>{notification.message}</ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </div>
  );
};

export default Notifications;
