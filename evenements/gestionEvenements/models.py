from django.db import models
from django.contrib.auth.models import User

class Evenement(models.Model):
    libelle = models.CharField(max_length=100)
    lieu = models.CharField(max_length=100)
    description = models.TextField()
    logo = models.ImageField(upload_to='logos/', blank=True, null=True)
    debut = models.DateTimeField()
    fin = models.DateTimeField()
    categorie = models.CharField(max_length=50)
    proprietaire = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.libelle
