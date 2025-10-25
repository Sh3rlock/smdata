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
                
                # In development, show more detailed error
                if settings.DEBUG:
                    return JsonResponse({
                        'success': False, 
                        'message': f'Email error: {str(e)}'
                    })
                else:
                    return JsonResponse({
                        'success': False, 
                        'message': 'Sorry, there was an error sending your message. Please try again later.'
                    })
                
        except Exception as e:
            return JsonResponse({
                'success': False, 
                'message': 'Sorry, there was an error processing your request. Please try again.'
            })
    
    return JsonResponse({'success': False, 'message': 'Invalid request method.'})
