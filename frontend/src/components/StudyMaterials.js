import React, { useState, useEffect } from 'react';
import { Table, Form, Button } from 'react-bootstrap';
import axios from 'axios';

const StudyMaterials = () => {
  const [materials, setMaterials] = useState([]);
  const [file, setFile] = useState(null);
  const [courseId, setCourseId] = useState('');
  const [title, setTitle] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8000/upload_study_material/')
      .then((response) => setMaterials(response.data))
      .catch((error) => console.error(error));
  }, []);

  const handleUpload = () => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('course_id', courseId);
    formData.append('title', title);

    axios.post('http://localhost:8000/upload_study_material/', formData)
      .then(() => {
        alert('Study material uploaded successfully!');
      })
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <h3>Study Materials</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Title</th>
            <th>File</th>
          </tr>
        </thead>
        <tbody>
          {materials.map((material) => (
            <tr key={material.id}>
              <td>{material.title}</td>
              <td>
                <a href={material.file} download>
                  Download
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Form>
        <Form.Group controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" onChange={(e) => setTitle(e.target.value)} />
        </Form.Group>
        <Form.Group controlId="courseId">
          <Form.Label>Course ID</Form.Label>
          <Form.Control type="text" onChange={(e) => setCourseId(e.target.value)} />
        </Form.Group>
        <Form.Group controlId="file">
          <Form.Label>File</Form.Label>
          <Form.Control type="file" onChange={(e) => setFile(e.target.files[0])} />
        </Form.Group>
        <Button variant="danger" onClick={handleUpload}>Upload</Button>
      </Form>
    </div>
  );
};

export default StudyMaterials;
