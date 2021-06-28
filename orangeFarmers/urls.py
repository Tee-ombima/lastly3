from django.urls import path
from . import views

urlpatterns = [
    path('handle-login', views.handleLogin, name="handle-login"),
    path('handle-signup', views.handleSignup, name="handle-signup")
]
