from django.urls import path, include
from main.views import MainFirstView, MainDetailView

urlpatterns = [
    path('', MainFirstView.as_view(), name='home'),
    path('<email>/', MainDetailView.as_view(), name='info'),
]
