import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, ListGroup, Button, Form } from 'react-bootstrap';
import axios from 'axios';

const StudentDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [submissionFile, setSubmissionFile] = useState(null);

  useEffect(() => {
    // Fetch enrolled courses
    axios.get('http://localhost:8000/courses/')
      .then(response => setCourses(response.data))
      .catch(err => console.error(err));

    // Fetch assignments
    axios.get('http://localhost:8000/assignments/')
      .then(response => setAssignments(response.data))
      .catch(err => console.error(err));
  }, []);

  const handleFileChange = (e) => {
    setSubmissionFile(e.target.files[0]);
  };

  const handleSubmitAssignment = (assignmentId) => {
    if (!submissionFile) {
      alert('Please select a file to submit.');
      return;
    }

    const formData = new FormData();
    formData.append('assignment_id', assignmentId);
    formData.append('file', submissionFile);

    axios.post('http://localhost:8000/submit_assignment/', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
      .then(() => {
        alert('Assignment submitted successfully!');
      })
      .catch((err) => {
        console.error(err);
        alert('Error submitting assignment.');
      });
  };

  return (
    <Container>
      <Row>
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Enrolled Courses</Card.Title>
              <ListGroup>
                {courses.map((course) => (
                  <ListGroup.Item key={course.id}>
                    <strong>{course.name}</strong>
                    <p>{course.description}</p>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Pending Assignments</Card.Title>
              <ListGroup>
                {assignments.map((assignment) => (
                  <ListGroup.Item key={assignment.id}>
                    <div>
                      <strong>{assignment.title}</strong>
                      <p>{assignment.description}</p>
                      <Form.Group>
                        <Form.Label>Upload Submission</Form.Label>
                        <Form.Control type="file" onChange={handleFileChange} />
                      </Form.Group>
                      <Button variant="danger"
                        onClick={() => handleSubmitAssignment(assignment.id)}
                        
                      >
                        Submit
                      </Button>
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default StudentDashboard;
