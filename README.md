# Learning Management System (LMS)

A modern, full-stack Learning Management System built with React and Django, featuring role-based access control and comprehensive course management capabilities.
- Demo_Working: [@yourusername](https://github.com/yourusername)

## 🚀 Features

### Core Features
- **Role-Based Authentication**
  - Student, Teacher, and Admin access levels
  - Protected routes and authorized actions

- **Course Management**
  - Course creation and editing (Teachers/Admins)
  - Student enrollment tracking
  - Course materials management
  - Interactive course dashboard

- **Assignment System**
  - Assignment creation and distribution
  - File submission system
  - Grading interface
  - Due date tracking
  - Feedback mechanism

### User-Specific Features

#### Students
- Personal dashboard with enrolled courses
- Assignment submission interface
- Progress tracking
- Grade viewing
- Course enrollment management

#### Teachers
- Course creation and management
- Assignment creation and grading
- Student progress monitoring
- Course analytics
- Material upload system

#### Administrators
- User management system
- Institution-wide analytics
- Course oversight
- System configuration
- User role management

## 🛠️ Technical Stack

### Frontend
- **React** - UI library
- **Bootstrap CSS** - Styling
- **Shadcn/UI** - Component library
- **Lucide React** - Icons
- **React Router** - Navigation


### Backend
- **Django** - Web framework
- **Django REST Framework** - API
- **SQL** - Database

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/ManpreetKaur04/Learning-Management-System.git
cd lms-system
```

2. Install frontend dependencies:
```bash
cd frontend
npm install
```

3. Install backend dependencies:
```bash
cd backend
pip install -r requirements.txt
```

4. Run migrations:
```bash
python manage.py migrate
```

5. Start the development servers:
```bash
# Frontend
npm start

# Backend
python manage.py runserver
```

## 🏗️ Project Structure

```
lms-system/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── index.css
│   │   └── App.js
│   └── public/
└── backend/
    ├── backend/
    ├── app/
    ├── manage.py
    ├── requirements.txt
    └── media/
```

## 📈 API Documentation

# API Documentation

## Authentication Endpoints

### Login
- **URL:** `/login/`
- **Method:** POST
- **Description:** Authenticates a user and creates a session
- **Required Fields:**
  - username (string)
  - password (string)
- **Returns:** Authentication token or session cookie

### Logout
- **URL:** `/logout/`
- **Method:** POST
- **Description:** Ends the user's current session
- **Authentication:** Required
- **Returns:** Success message

## Course Management

### List Courses
- **URL:** `/courses/`
- **Method:** GET
- **Description:** Retrieves a list of all available courses
- **Authentication:** Required
- **Returns:** Array of course objects containing course details

### List Assignments
- **URL:** `/assignments/`
- **Method:** GET
- **Description:** Retrieves all assignments for the authenticated user
- **Authentication:** Required
- **Returns:** Array of assignment objects

### Submit Assignment
- **URL:** `/submit_assignment/`
- **Method:** POST
- **Description:** Allows students to submit their assignments
- **Authentication:** Required
- **Required Fields:**
  - assignment_id (integer)
  - submission_file (file)
  - comments (string, optional)
- **Returns:** Submission confirmation

## Attendance Management

### Mark Attendance
- **URL:** `/attendance/`
- **Method:** POST
- **Description:** Records attendance for students
- **Authentication:** Required
- **Required Fields:**
  - course_id (integer)
  - student_ids (array)
  - date (date)
- **Returns:** Attendance confirmation

### Active Students
- **URL:** `/active_students/<course_id>/`
- **Method:** GET
- **Description:** Lists all active students for a specific course
- **Authentication:** Required
- **Parameters:**
  - course_id (integer) - URL parameter
- **Returns:** Array of active student objects

## Study Materials

### Upload Study Material
- **URL:** `/upload_study_material/`
- **Method:** POST
- **Description:** Uploads study materials for a course
- **Authentication:** Required (Teacher/Admin only)
- **Required Fields:**
  - course_id (integer)
  - title (string)
  - description (string)
  - file (file)
- **Returns:** Upload confirmation

## Notifications

### Send Notification
- **URL:** `/send_notification/`
- **Method:** POST
- **Description:** Sends notifications to specified users
- **Authentication:** Required (Admin/Teacher only)
- **Required Fields:**
  - recipients (array)
  - message (string)
  - priority (string, optional)
- **Returns:** Notification sent confirmation

### Get Notifications
- **URL:** `/get_notifications/`
- **Method:** GET
- **Description:** Retrieves notifications for the authenticated user
- **Authentication:** Required
- **Optional Parameters:**
  - limit (integer)
  - offset (integer)
- **Returns:** Array of notification objects

## User Management

### Get Users
- **URL:** `/get_users/`
- **Method:** GET
- **Description:** Retrieves list of users (filtered based on user role)
- **Authentication:** Required (Admin only)
- **Optional Parameters:**
  - role (string)
  - status (string)
- **Returns:** Array of user objects

### Add User
- **URL:** `/add_user/`
- **Method:** POST
- **Description:** Creates a new user account
- **Authentication:** Required (Admin only)
- **Required Fields:**
  - username (string)
  - email (string)
  - password (string)
  - role (string)
  - first_name (string)
  - last_name (string)
- **Returns:** Created user object

