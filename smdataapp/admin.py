from django.contrib import admin
from .models import ContactSubmission

@admin.register(ContactSubmission)
class ContactSubmissionAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'phone', 'created_at', 'sent_to_email')
    list_filter = ('created_at', 'sent_to_email')
    search_fields = ('name', 'email', 'message')
    readonly_fields = ('name', 'email', 'phone', 'message', 'created_at', 'sent_to_email')
    
    def has_add_permission(self, request):
        return False  # Disable manual creation
