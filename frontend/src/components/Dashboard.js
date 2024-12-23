// src/components/Dashboard.js
import React from 'react';
import AdminDashboard from './AdminDashboard';
import TeacherDashboard from './TeacherDashboard';
import StudentDashboard from './StudentDashboard';
import Navigation from './Navigation';

const Dashboard = ({ userRole }) => {
  return (
    <div>
      <Navigation userRole={userRole} />
      {userRole === 'admin' && <AdminDashboard />}
      {userRole === 'teacher' && <TeacherDashboard />}
      {userRole === 'student' && <StudentDashboard />}
    </div>
  );
};

export default Dashboard;
