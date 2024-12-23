# Learning Management System (LMS)

A modern, full-stack Learning Management System built with React and Django, featuring role-based access control and comprehensive course management capabilities.

![LMS Dashboard](/api/placeholder/800/400)

## 🚀 Features

### Core Features
- **Role-Based Authentication**
  - Student, Teacher, and Admin access levels
  - Secure JWT-based authentication
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
- **Tailwind CSS** - Styling
- **Shadcn/UI** - Component library
- **Lucide React** - Icons
- **React Router** - Navigation
- **JWT Decode** - Authentication

### Backend
- **Django** - Web framework
- **Django REST Framework** - API
- **PostgreSQL** - Database
- **JWT** - Authentication
- **Celery** - Background tasks

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/lms-system.git
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

4. Set up environment variables:
```bash
# Frontend (.env)
REACT_APP_API_URL=http://localhost:8000/api
REACT_APP_JWT_SECRET=your_jwt_secret

# Backend (.env)
DEBUG=True
SECRET_KEY=your_secret_key
DATABASE_URL=postgresql://user:password@localhost:5432/lms_db
```

5. Run migrations:
```bash
python manage.py migrate
```

6. Start the development servers:
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
│   │   │   ├── auth/
│   │   │   ├── course/
│   │   │   ├── assignment/
│   │   │   └── ui/
│   │   ├── contexts/
│   │   ├── hooks/
│   │   ├── pages/
│   │   └── utils/
│   └── public/
└── backend/
    ├── core/
    ├── users/
    ├── courses/
    ├── assignments/
    └── api/
```

## 🔒 Security Features

- JWT-based authentication
- Role-based access control
- Input sanitization
- XSS protection
- CSRF protection
- Rate limiting
- File upload validation

## 🚀 Deployment

### Frontend Deployment (Vercel)
1. Connect your GitHub repository
2. Configure build settings:
```bash
Build Command: npm run build
Output Directory: build
```

### Backend Deployment (Heroku)
1. Create a new Heroku app
2. Configure environment variables
3. Deploy using Heroku CLI:
```bash
heroku git:remote -a your-app-name
git push heroku main
```

## 📈 API Documentation

### Authentication Endpoints
```
POST /api/auth/login/
POST /api/auth/refresh/
POST /api/auth/logout/
```

### Course Endpoints
```
GET /api/courses/
POST /api/courses/
GET /api/courses/{id}/
PUT /api/courses/{id}/
DELETE /api/courses/{id}/
```

### Assignment Endpoints
```
GET /api/assignments/
POST /api/assignments/
GET /api/assignments/{id}/
PUT /api/assignments/{id}/
POST /api/assignments/{id}/submit/
```

## 🧪 Testing

### Frontend Testing
```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage
```

### Backend Testing
```bash
# Run tests
python manage.py test

# Run tests with coverage
coverage run manage.py test
coverage report
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## 🙋‍♂️ Author

Your Name
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your Name](https://linkedin.com/in/yourprofile)
- Portfolio: [yourportfolio.com](https://yourportfolio.com)

## 🌟 Acknowledgments

- Shadcn/UI for the component library
- Tailwind CSS for the utility-first CSS framework
- Django community for the robust backend framework