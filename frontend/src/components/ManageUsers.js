// src/components/ManageUsers.js
import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import axios from 'axios';

const ManageUsers = () => {
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    // Fetch users (teachers and students) when the component mounts
    axios.get('http://localhost:8000/get_users/')
      .then((response) => {
        setTeachers(response.data.teachers);
        setStudents(response.data.students);
      })
      .catch((error) => console.error('Error fetching users:', error));
  }, []);

  return (
    <div>
      <h3>Manage Users</h3>

      <h4>Teachers</h4>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {teachers.map((teacher) => (
            <tr key={teacher.id}>
              <td>{teacher.id}</td>
              <td>{teacher.name}</td>
              <td>{teacher.role}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <h4>Students</h4>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.name}</td>
              <td>{student.role}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ManageUsers;
