import uuid
from django.db import models

class Item(models.Model):
    class ItemType(models.TextChoices):
        COMPUTER_EQUIPMENT = 'computer_equipment'
        COMMUNICATION_EQUIPMENT = 'communication_equipment'
        FURNITURE = 'furniture'
        MACHINERY = 'machinery'

    class ItemState(models.TextChoices):
        IN_USE = 'in_use'
        LOST = 'lost'
        DEPRECATED = 'deprecated'
        BROKEN = 'broken'

    id = models.UUIDField(primary_key = True, default = uuid.uuid4, editable = False)
    type = models.CharField(max_length = 50, choices = ItemType.choices)
    description = models.CharField(max_length = 255)
    added_at = models.DateField(auto_now_add=True)
    state = models.CharField(max_length = 50, choices = ItemState.choices)
    last_updated_at = models.DateField(auto_now=True)

    def __str__(self):
        return f"{self.type} - {self.description}"
