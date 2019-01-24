from django.contrib import admin
from django.urls import path, include
from user.views import UserRegistrationView, UserLoginView, UserVerificationView, ResendVerifyEmailView
from django.contrib.auth.views import LogoutView

app_name="user"

urlpatterns = [
<<<<<<< HEAD
    path('signup/', UserRegistrationView.as_view()),
    path('login/', UserLoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view()),
=======
    path('signup/', UserRegistrationView.as_view(),name='signup'),
    path('login/', UserLoginView.as_view(),name='login'),
    path('logout/', LogoutView.as_view(),name='logout'),
>>>>>>> 1f8637810e25b4131352d1f68750962c0d9b4647
    path('<pk>/verify/<token>/', UserVerificationView.as_view()),
    path('resend_verify_email/', ResendVerifyEmailView.as_view()),
]
