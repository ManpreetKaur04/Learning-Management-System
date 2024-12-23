from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.models import User
from .models import Profile, Course, Assignment, Attendance, StudyMaterial, Notification

# Inline form to edit Profile within the User admin
class ProfileInline(admin.StackedInline):
    model = Profile
    can_delete = False
    verbose_name_plural = 'Profile'
    fk_name = 'user'

# Extend the UserAdmin to include Profile
class CustomUserAdmin(UserAdmin):
    inlines = (ProfileInline,)

# Register the custom User admin
admin.site.unregister(User)
admin.site.register(User, CustomUserAdmin)

# Register other models
@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'role')
    search_fields = ('user__username', 'role')

@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = ('name', 'description')
    search_fields = ('name',)

@admin.register(Assignment)
class AssignmentAdmin(admin.ModelAdmin):
    list_display = ('course', 'title', 'due_date', 'created_at')
    list_filter = ('course', 'due_date')
    search_fields = ('title', 'course__name')

@admin.register(Attendance)
class AttendanceAdmin(admin.ModelAdmin):
    list_display = ('student', 'course', 'date', 'status')
    list_filter = ('course', 'status', 'date')
    search_fields = ('student__username', 'course__name')

@admin.register(StudyMaterial)
class StudyMaterialAdmin(admin.ModelAdmin):
    list_display = ('course', 'title', 'uploaded_at')
    list_filter = ('course', 'uploaded_at')
    search_fields = ('title', 'course__name')

@admin.register(Notification)
class NotificationAdmin(admin.ModelAdmin):
    list_display = ('message', 'date_sent')
    search_fields = ('message',)
