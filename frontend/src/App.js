// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import AdminDashboard from './components/AdminDashboard';
import TeacherDashboard from './components/TeacherDashboard';
import AttendanceTracking from './components/AttendenceTracking';
import AssignmentManagement from './components/AssignmentManagement';
import StudyMaterials from './components/StudyMaterials';
import Notifications from './components/Notifications';
import Courses from './components/Courses';
import ManageUsers from './components/ManageUsers';
import AddUser from './components/AddUser';
import './index.css';  // Import the global styles

function App() {
  const [userRole, setUserRole] = useState(''); // This would be set after successful login

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin-dashboard" element={<Dashboard userRole="admin" />} />
        <Route path="/teacher-dashboard" element={<Dashboard userRole="teacher" />} />
        <Route path="/student-dashboard" element={<Dashboard userRole="student" />} />
        <Route path="/attendance" element={<AttendanceTracking />} />
        <Route path="/assignments" element={<AssignmentManagement />} />
        <Route path="/study-materials" element={<StudyMaterials />} />
        <Route path="/send-notifications" element={<Notifications />} />

        <Route path="/courses" element={<Courses />} />
        <Route path="/all-users" element={<ManageUsers/>} />
        <Route path='/add-users' element={<AddUser/>} />
      </Routes>
    </Router>
  );
}

export default App;
