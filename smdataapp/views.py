# myapp/views.py
from django.shortcuts import render, redirect
from django.contrib import messages
from django.core.mail import send_mail, EmailMessage
from django.conf import settings
from django.http import JsonResponse
import json

def index(request):
    return render(request, 'index.html')

def contact_form(request):
    if request.method == 'POST':
        try:
            # Get form data
            name = request.POST.get('name', '').strip()
            email = request.POST.get('email', '').strip()
            phone = request.POST.get('phone', '').strip()
            comments = request.POST.get('comments', '').strip()
            
            # Basic validation
            if not name or not email or not comments:
                return JsonResponse({
                    'success': False, 
                    'message': 'Please fill in all required fields (Name, Email, and Comments).'
                })
            
            # Prepare email content
            subject = f'New Contact Form Submission from {name}'
            message = f"""
New contact form submission from smdata.dev website:

Name: {name}
Email: {email}
Phone: {phone or 'Not provided'}

Message:
{comments}

---
This message was sent from the contact form on smdata.dev
            """
            
            # Send email
            try:
                send_mail(
                    subject=subject,
                    message=message,
                    from_email=settings.DEFAULT_FROM_EMAIL,
                    recipient_list=['info@smdata.dev'],
                    fail_silently=False,
                )
                
                return JsonResponse({
                    'success': True, 
                    'message': 'Thank you for your message! We will get back to you soon.'
                })
                
            except Exception as e:
                # Log the error for debugging
                import logging
                logger = logging.getLogger(__name__)
                logger.error(f"Email sending failed: {str(e)}")
                logger.error(f"EMAIL_BACKEND: {settings.EMAIL_BACKEND}")
                logger.error(f"EMAIL_HOST_USER: {settings.EMAIL_HOST_USER}")
                logger.error(f"HAS_EMAIL_PASSWORD: {bool(settings.EMAIL_HOST_PASSWORD)}")
                
                # Show detailed error for debugging
                error_message = f'Email error: {str(e)}'
                if hasattr(settings, 'EMAIL_BACKEND'):
                    error_message += f' | Backend: {settings.EMAIL_BACKEND}'
                
                return JsonResponse({
                    'success': False, 
                    'message': error_message
                })
                
        except Exception as e:
            return JsonResponse({
                'success': False, 
                'message': 'Sorry, there was an error processing your request. Please try again.'
            })
    
    return JsonResponse({'success': False, 'message': 'Invalid request method.'})
