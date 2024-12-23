import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, ListGroup } from 'react-bootstrap';
import axios from 'axios';

const TeacherDashboard = () => {
  const [activeStudents, setActiveStudents] = useState([]);
  const courseId = 1; // Replace with the actual course ID for which you want to display active students

  useEffect(() => {
    axios.get(`http://localhost:8000/active_students/${courseId}/`)
      .then(response => setActiveStudents(response.data))
      .catch(err => console.error(err));
  }, [courseId]);

  return (
    <Container>
      <Row>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>
                <Card.Link href="/courses">My Courses</Card.Link>
              </Card.Title>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Active Students</Card.Title>
              {activeStudents.length > 0 ? (
                <ListGroup>
                  {activeStudents.map(student => (
                    <ListGroup.Item key={student.id}>
                      {student.name} ({student.email})
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              ) : (
                <Card.Text>No active students</Card.Text>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default TeacherDashboard;
