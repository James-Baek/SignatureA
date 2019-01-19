from django.contrib import admin
from django.urls import path, include
from user.views import UserRegistrationView, UserLoginView, UserVerificationView, ResendVerifyEmailView
from django.contrib.auth.views import LogoutView

urlpatterns = [
    path('signup/', UserRegistrationView.as_view()),
    path('login/', UserLoginView.as_view()),
    path('logout/', LogoutView.as_view()),
    path('<pk>/verify/<token>/', UserVerificationView.as_view()),
    path('resend_verify_email/', ResendVerifyEmailView.as_view()),
]
