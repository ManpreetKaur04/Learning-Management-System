import React, { useState, useEffect } from 'react';
import { Table, Button, Form } from 'react-bootstrap';
import axios from 'axios';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [courseName, setCourseName] = useState('');
  const [courseDescription, setCourseDescription] = useState('');

  useEffect(() => {
    // Fetch courses from the backend
    axios.get('http://localhost:8000/courses/')
      .then(response => setCourses(response.data))
      .catch(err => console.error(err));
  }, []);

  const handleAddCourse = () => {
    const newCourse = { name: courseName, description: courseDescription };
    axios.post('http://localhost:8000/courses/', newCourse)
      .then(response => {
        setCourses([...courses, response.data]); // Add the new course to the list
        setCourseName(''); // Clear form fields
        setCourseDescription('');
        alert('Course added successfully!');
      })
      .catch(err => {
        console.error(err);
        alert('Error adding course');
      });
  };

  return (
    <div>
      <h3>Courses</h3>
      <Form>
        <Form.Group controlId="courseName">
          <Form.Label>Course Name</Form.Label>
          <Form.Control 
            type="text" 
            value={courseName} 
            onChange={(e) => setCourseName(e.target.value)} 
          />
        </Form.Group>
        <Form.Group controlId="courseDescription">
          <Form.Label>Course Description</Form.Label>
          <Form.Control 
            as="textarea" 
            rows={3} 
            value={courseDescription} 
            onChange={(e) => setCourseDescription(e.target.value)} 
          />
        </Form.Group>
        <Button variant="danger" onClick={handleAddCourse}>Add Course</Button>
      </Form>
      <h4>Available Courses</h4>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {courses.map(course => (
            <tr key={course.id}>
              <td>{course.id}</td>
              <td>{course.name}</td>
              <td>{course.description}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Courses;
