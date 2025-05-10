from django.urls import path , include
from . import views

app_name = 'home'

urlpatterns = [
    path('', views.home_page, name='home_page') ,
    path('about/', views.about_page, name='about_page') 
]
