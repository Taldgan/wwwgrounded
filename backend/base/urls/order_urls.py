from django.urls import path
from base.views import order_views as views

urlpatterns = [
        path('api/orders/', views.addOrderItems, name='orders-add'),
]
