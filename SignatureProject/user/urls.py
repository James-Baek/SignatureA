from django.contrib import admin
from django.urls import path, include
from user.views import UserRegistrationView, UserLoginView, UserVerificationView, ResendVerifyEmailView
from django.contrib.auth.views import LogoutView

app_name="user"

urlpatterns = [
    path('signup/', UserRegistrationView.as_view(),name='signup'),
    path('login/', UserLoginView.as_view(),name='login'),
    path('logout/', LogoutView.as_view(),name='logout'),
    path('<pk>/verify/<token>/', UserVerificationView.as_view()),
    path('resend_verify_email/', ResendVerifyEmailView.as_view()),
]
