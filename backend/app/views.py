from django.contrib.auth.models import User
from django.contrib.auth import authenticate, logout
from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from .serializers import *
from django.utils import timezone
from .models import Profile
from django.contrib.auth.hashers import make_password


@api_view(['POST'])
def login_view(request):
    email = request.data.get('email')
    password = request.data.get('password')
    role = request.data.get('role')

    # Authenticate user by email (instead of default username)
    try:
        user = User.objects.get(email=email)
    except User.DoesNotExist:
        return Response({'message': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)

    # Authenticate password
    if user.check_password(password):
        # Check if the role matches the user's expected role
        if user.is_superuser and role == 'Admin':
            return Response({
                'role': 'Admin',
                'username': user.username,
                'message': 'Login successful! You are a superuser.'
            }, status=status.HTTP_200_OK)
        elif hasattr(user, 'profile') and user.profile.role == role:
            return Response({
                'role': role,
                'username': user.username,
                'message': 'Login successful!'
            }, status=status.HTTP_200_OK)
        else:
            return Response({'message': 'Role mismatch or unauthorized access'}, status=status.HTTP_403_FORBIDDEN)
    else:
        return Response({'message': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def logout_view(request):
    logout(request)  # Logout the user (this will clear the session)
    return Response({"message": "Logout successful"}, status=status.HTTP_200_OK)

# Course Management (Admin/Teacher)
@api_view(['GET', 'POST'])
def course_list(request):
    if request.method == 'GET':
        courses = Course.objects.all()
        serializer = CourseSerializer(courses, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = CourseSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# Assignment Management (Teacher/Admin)
@api_view(['GET', 'POST'])
def assignment_list(request):
    if request.method == 'GET':
        assignments = Assignment.objects.all()
        serializer = AssignmentSerializer(assignments, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = AssignmentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def submit_assignment(request):
    assignment_id = request.data.get('assignment_id')
    file = request.FILES.get('file')

    if not assignment_id or not file:
        return Response({"error": "Assignment ID and file are required"}, status=status.HTTP_400_BAD_REQUEST)

    try:
        assignment = Assignment.objects.get(id=assignment_id)
        # Save the file or do other processing
        # For simplicity, you can use a `Submission` model to save this data.
        return Response({"message": "Assignment submitted successfully"}, status=status.HTTP_200_OK)
    except Assignment.DoesNotExist:
        return Response({"error": "Assignment not found"}, status=status.HTTP_404_NOT_FOUND)

# Attendance Tracking (Teacher/Admin)
@api_view(['POST'])
def mark_attendance(request):
    student_id = request.data.get('student_id')
    course_id = request.data.get('course_id')
    attendance_status = request.data.get('status')  # Renamed the variable to avoid conflict

    student = User.objects.get(id=student_id)
    course = Course.objects.get(id=course_id)

    attendance = Attendance(student=student, course=course, status=attendance_status)
    attendance.date = timezone.now()  # Add this line to set the current date
    attendance.save()

    return Response({'message': 'Attendance marked successfully'}, status=status.HTTP_200_OK)

# Upload Study Materials (Teacher)
@api_view(['POST'])
def upload_study_material(request):
    course_id = request.data.get('course_id')
    title = request.data.get('title')
    file = request.FILES.get('file')

    course = Course.objects.get(id=course_id)
    material = StudyMaterial(course=course, title=title, file=file)
    material.save()

    # Serialize the created object to return
    serializer = StudyMaterialSerializer(material)
    return Response({'message': 'Study material uploaded successfully', 'data': serializer.data}, status=status.HTTP_200_OK)

# Send Notifications (Admin)
@api_view(['POST'])
def send_notification(request):
    message = request.data.get('message')

    notification = Notification(message=message)
    notification.save()

    return Response({'message': 'Notification sent successfully'}, status=status.HTTP_200_OK)

@api_view(['GET'])
def get_notifications(request):
    notifications = Notification.objects.all()
    notifications_data = [{'message': notification.message} for notification in notifications]
    return Response(notifications_data)

@api_view(['GET'])
def active_students(request, course_id):
    try:
        course = Course.objects.get(id=course_id)
        attendance_records = Attendance.objects.filter(course=course, status="Present")
        active_students = [
            {
                "id": record.student.id,
                "name": record.student.username,
                "email": record.student.email,
            }
            for record in attendance_records
        ]
        return Response(active_students, status=status.HTTP_200_OK)
    except Course.DoesNotExist:
        return Response({"error": "Course not found"}, status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
def get_users(request):
    # Filter the profiles by role
    teachers_profiles = Profile.objects.filter(role='Teacher')
    students_profiles = Profile.objects.filter(role='Student')
    
    # Prepare the response data
    teachers_data = [{'id': profile.user.id, 'name': profile.user.username, 'role': profile.role} for profile in teachers_profiles]
    students_data = [{'id': profile.user.id, 'name': profile.user.username, 'role': profile.role} for profile in students_profiles]
    
    return Response({
        'teachers': teachers_data,
        'students': students_data
    }, status=status.HTTP_200_OK)

@api_view(['POST'])
def add_user(request):
    data = request.data

    # Validate required fields
    required_fields = ['username', 'email', 'password', 'role']
    for field in required_fields:
        if field not in data:
            return Response(
                {'message': f'{field} is required'},
                status=status.HTTP_400_BAD_REQUEST
            )

    # Create user
    try:
        user = User.objects.create(
            username=data['username'],
            email=data['email'],
            password=make_password(data['password']),
        )
        user.save()

        # Create profile with the user role
        profile = Profile.objects.create(
            user=user,
            role=data['role']
        )
        profile.save()

        return Response(
            {'message': 'User created successfully'},
            status=status.HTTP_201_CREATED
        )
    
    except Exception as e:
        return Response(
            {'message': str(e)},
            status=status.HTTP_400_BAD_REQUEST
        )