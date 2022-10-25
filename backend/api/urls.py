from django.urls import path, include
from . import views
from rest_framework.routers import DefaultRouter

app_name = 'user'

router = DefaultRouter()
router.register('profile', views.ProfileviewSet)
router.register('post', views.PostViewSet)
router.register('comment', views.CommentViewSet)

urlpatterns = [
    path('register/', views.CreateUserView.as_view(), name='register'),
    path('myprofile/', views.MyProfileListView.as_view(), name='myprofile'),
    path('profile-list/', views.ProfileListView.as_view(), name='profile-list'),
    path('profile-detail/<slug:pk>/',
         views.ProfileRetrieveView.as_view(), name='profile-detail'),
    path('post-list/', views.PostListView.as_view(), name='post-list'),
    path('post-detail/<slug:pk>/',
         views.PostRetrieveView.as_view(), name='post-detail'),
    path('', include(router.urls))
]
