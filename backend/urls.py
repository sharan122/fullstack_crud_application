from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from .views import *

urlpatterns = [
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', register_user),
    path('login/', login_view, name='login'),
    path('user/', user_details_view, name='user-details'),
    path('users-list/',user_list,name = 'user-list'),
    path('add-user/', add_user, name='add-user'),
    path('delete-user/<int:user_id>/', delete_user, name='delete_user'),
    path('edit-profile/',edit_profile, name='edit_profile'),
    path('logout/', logout_user, name='logout'),
    path('block/<int:id>', block_user, name='block_user'),
]
