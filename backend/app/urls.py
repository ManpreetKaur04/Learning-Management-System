# urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('login/', views.login_view, name='login'),
    path('logout/', views.logout_view, name='logout'),
]
urlpatterns += [
    path('courses/', views.course_list, name='course_list'),
    path('assignments/', views.assignment_list, name='assignment_list'),
    path('attendance/', views.mark_attendance, name='mark_attendance'),
    path('upload_study_material/', views.upload_study_material, name='upload_study_material'),

    path('send_notification/', views.send_notification, name='send_notification'),
    path('get_notifications/', views.get_notifications, name='get_notification'),

    path('active_students/<int:course_id>/', views.active_students, name='active_students'),
    path('submit_assignment/', views.submit_assignment, name='submit_assignment'),

    path('get_users/', views.get_users, name='get_users'),
    path('add_user/', views.add_user, name='add_user'),

    
    
]

