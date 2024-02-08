from django.db import models

class Organisateur(models.Model):
    TYPE_CHOICES = (
        ('physique', 'Physique'),
        ('morale', 'Morale'),
    )
    nom = models.CharField(max_length=100)
    type = models.CharField(max_length=10, choices=TYPE_CHOICES)

    def __str__(self):
        return self.nom


class Evenement(models.Model):
    libelle = models.CharField(max_length=100)
    lieu = models.CharField(max_length=100)
    description = models.TextField()
    logo = models.ImageField(upload_to='logos/', blank=True, null=True)
    debut = models.DateTimeField()
    fin = models.DateTimeField()
    categorie = models.CharField(max_length=50)
    proprietaire = models.ForeignKey(Organisateur, on_delete=models.CASCADE, blank=True, null=True)

    def __str__(self):
        return self.libelle
