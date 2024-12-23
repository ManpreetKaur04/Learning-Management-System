import React, { useState, useEffect } from 'react';
import { Table, Button, Form } from 'react-bootstrap';
import axios from 'axios';

const AssignmentManagement = () => {
  const [assignments, setAssignments] = useState([]);
  const [newAssignment, setNewAssignment] = useState({ title: '', description: '', due_date: '' });

  useEffect(() => {
    axios.get('http://localhost:8000/assignments/')
      .then((response) => setAssignments(response.data))
      .catch((error) => console.error(error));
  }, []);

  const handleAddAssignment = () => {
    axios.post('http://localhost:8000/assignments/', newAssignment)
      .then(() => {
        alert('Assignment created successfully!');
      })
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <h3>Assignments</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Due Date</th>
          </tr>
        </thead>
        <tbody>
          {assignments.map((assignment) => (
            <tr key={assignment.id}>
              <td>{assignment.title}</td>
              <td>{assignment.description}</td>
              <td>{assignment.due_date}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Form>
        <Form.Group controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" onChange={(e) => setNewAssignment({ ...newAssignment, title: e.target.value })} />
        </Form.Group>
        <Form.Group controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control type="text" onChange={(e) => setNewAssignment({ ...newAssignment, description: e.target.value })} />
        </Form.Group>
        <Form.Group controlId="due_date">
          <Form.Label>Due Date</Form.Label>
          <Form.Control type="date" onChange={(e) => setNewAssignment({ ...newAssignment, due_date: e.target.value })} />
        </Form.Group>
        <Button variant="danger"onClick={handleAddAssignment}>Add Assignment</Button>
      </Form>
    </div>
  );
};

export default AssignmentManagement;
