from django.shortcuts import render

from rest_framework import viewsets
from .models import Evenement
from .serializers import EvenementSerializer
from rest_framework.permissions import IsAuthenticated

class EvenementViewSet(viewsets.ModelViewSet):
    queryset = Evenement.objects.all()
    serializer_class = EvenementSerializer
    permission_classes = [IsAuthenticated]

