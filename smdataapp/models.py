from django.db import models
from django.utils import timezone

class ContactSubmission(models.Model):
    """Model to store contact form submissions as a fallback when email fails"""
    name = models.CharField(max_length=200)
    email = models.EmailField()
    phone = models.CharField(max_length=50, blank=True)
    message = models.TextField()
    created_at = models.DateTimeField(default=timezone.now)
    sent_to_email = models.BooleanField(default=False)
    
    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Contact Submission'
        verbose_name_plural = 'Contact Submissions'
    
    def __str__(self):
        return f"Contact from {self.name} ({self.email}) - {self.created_at.strftime('%Y-%m-%d %H:%M')}"
