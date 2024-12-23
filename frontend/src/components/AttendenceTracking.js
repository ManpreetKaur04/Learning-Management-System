import React, { useState, useEffect } from 'react';
import { Table, Button, Form } from 'react-bootstrap';
import axios from 'axios';

const AttendanceTracking = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [studentId, setStudentId] = useState('');
  const [courseId, setCourseId] = useState('');
  const [status, setStatus] = useState('Present');

  useEffect(() => {
    // Fetch attendance data if needed
    // Example: axios.get('/attendance').then(response => setAttendanceData(response.data));
  }, []);

  const handleMarkAttendance = () => {
    axios.post('http://localhost:8000/attendance/', {
      student_id: studentId,
      course_id: courseId,
      status,
    })
    .then(() => {
      alert('Attendance marked successfully!');
    })
    .catch((err) => {
      console.error(err);
      alert('Error marking attendance');
    });
  };

  return (
    <div>
      <h3>Attendance Tracking</h3>
      <Form>
        <Form.Group controlId="studentId">
          <Form.Label>Student ID</Form.Label>
          <Form.Control type="text" value={studentId} onChange={(e) => setStudentId(e.target.value)} />
        </Form.Group>
        <Form.Group controlId="courseId">
          <Form.Label>Course ID</Form.Label>
          <Form.Control type="text" value={courseId} onChange={(e) => setCourseId(e.target.value)} />
        </Form.Group>
        <Form.Group controlId="status">
          <Form.Label>Status</Form.Label>
          <Form.Select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="Present">Present</option>
            <option value="Absent">Absent</option>
          </Form.Select>
        </Form.Group>
        <Button variant="danger" onClick={handleMarkAttendance}>Mark Attendance</Button>
      </Form>
    </div>
  );
};

export default AttendanceTracking;
