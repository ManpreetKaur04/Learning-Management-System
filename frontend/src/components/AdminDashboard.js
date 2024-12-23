// src/components/AdminDashboard.js
import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const AdminDashboard = () => {
  return (
    <Container>
      <Row>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title><Card.Link href="/all-users">Total Users</Card.Link></Card.Title>
              <Card.Text>150</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title><Card.Link href='/courses'>Active Courses</Card.Link></Card.Title>
              
              <Card.Text>25</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminDashboard;
