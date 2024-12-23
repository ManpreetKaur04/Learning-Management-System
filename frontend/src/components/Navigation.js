// src/components/Navigation.js
import React from 'react';
import { Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';  // Use useNavigate instead of useHistory

const Navigation = ({ userRole }) => {
  const navigate = useNavigate();  // Initialize navigate

  const handleLogout = () => {
    // Clear the authentication data (like JWT token or session)
    localStorage.removeItem('token');  // or sessionStorage depending on where you're storing it

    // Redirect to the login page
    navigate('/');  // Use navigate to go to the login page
  };

  return (
    <Nav className="bg-light p-2 mb-4">
      
      {userRole === 'admin' && (
        <>
          <Nav.Item>
            <Nav.Link href="/add-users">Manage Users</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/courses">Manage Courses</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/admin-dashboard">Student Performance Analytics</Nav.Link>
          </Nav.Item>
          <Nav.Item>
        <Nav.Link href="/send-notifications">Create Notifications</Nav.Link>
      </Nav.Item>
        </>
      )}
      {userRole === 'teacher' && (
        <>
          <Nav.Item>
            <Nav.Link href="/study-materials">Upload-Study-Materials</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/assignments">Add-Assignments</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/attendance">Student-Attendence</Nav.Link>
          </Nav.Item>
          <Nav.Item>
        <Nav.Link href="/notifications">Notifications</Nav.Link>
      </Nav.Item>
        </>
      )}
      {userRole === 'student' && (
        <>
          <Nav.Item>
            <Nav.Link href="/courses">My Courses</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/assignments">My Assignments</Nav.Link>
          </Nav.Item>
          <Nav.Item>
        <Nav.Link href="/send-notifications">Notifications</Nav.Link>
      </Nav.Item>
        </>
      )}
      
      <Nav.Item>
        <Nav.Link onClick={handleLogout}>Logout</Nav.Link> {/* Logout link */}
      </Nav.Item>
    </Nav>
  );
};

export default Navigation;
