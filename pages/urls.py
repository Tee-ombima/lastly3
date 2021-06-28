from django.urls import path
from . import views

app_name = "pages"

urlpatterns = [
    path('', views.index, name="home"),
    path('oranges', views.oranges, name="oranges"),
    path('oranges/<int:id>', views.orange, name="orange"),
    path('about-us', views.aboutUs, name="about-us"),
    path('contact-us', views.contactUs, name="contact-us"),
    path('handle-contact-us', views.handleContactUs, name="handle-contact-us"),
    path('login', views.authLogin, name="login"),
    path('signup', views.authSignup, name="signup"),
    path('dashboard', views.dashboard, name="dashboard"),
    path('logout', views.logout, name="logout"),
    path('getProfileInfo', views.getProfileInfo, name="profileInfo"),
    path('getProfileVehicles', views.getProfileVehicles, name="profileVehicles")
]
