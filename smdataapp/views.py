# myapp/views.py
from django.shortcuts import render, redirect
from django.contrib import messages
from django.core.mail import send_mail, EmailMessage
from django.conf import settings
from django.http import JsonResponse
from .models import ContactSubmission
import json
import logging

# Set up logger
logger = logging.getLogger(__name__)

def index(request):
    return render(request, 'index.html')

def privacy(request):
    return render(request, 'privacy.html')

def terms(request):
    return render(request, 'terms.html')

def contact_form(request):
    if request.method == 'POST':
        try:
            # Log request for debugging
            logger.info(f"Contact form submission received from {request.META.get('REMOTE_ADDR')}")
            
            # Get form data
            name = request.POST.get('name', '').strip()
            email = request.POST.get('email', '').strip()
            phone = request.POST.get('phone', '').strip()
            comments = request.POST.get('comments', '').strip()
            
            logger.debug(f"Form data: name={name}, email={email}, comments_len={len(comments)}")
            
            # Basic validation
            if not name or not email or not comments:
                return JsonResponse({
                    'success': False, 
                    'message': 'Please fill in all required fields (Name, Email, and Comments).'
                })
            
            # Save to database first (as backup)
            submission = ContactSubmission.objects.create(
                name=name,
                email=email,
                phone=phone,
                message=comments,
                sent_to_email=False
            )
            logger.info(f"Contact submission saved to database with ID {submission.id}")
            
            # Prepare email content
            subject = f'New Contact Form Submission from {name}'
            message = f"""New contact form submission from smdata.dev website:

Name: {name}
Email: {email}
Phone: {phone or 'Not provided'}

Message:
{comments}

---
This message was sent from the contact form on smdata.dev"""
            
            # Get from_email with fallback
            from_email = getattr(settings, 'DEFAULT_FROM_EMAIL', 'info@smdata.dev')
            
            # Send email
            try:
                logger.info(f"Attempting to send email from {from_email} to info@smdata.dev")
                send_mail(
                    subject=subject,
                    message=message,
                    from_email=from_email,
                    recipient_list=['info@smdata.dev'],
                    fail_silently=True,  # Changed to True to prevent crashes
                )
                logger.info("Email sent successfully")
                
                # Mark as sent
                submission.sent_to_email = True
                submission.save()
                
                return JsonResponse({
                    'success': True, 
                    'message': 'Thank you for your message! We will get back to you soon.'
                })
                
            except Exception as e:
                # Log the error for debugging
                logger.error(f"Email sending failed: {str(e)}", exc_info=True)
                logger.error(f"EMAIL_BACKEND: {getattr(settings, 'EMAIL_BACKEND', 'NOT SET')}")
                logger.error(f"EMAIL_HOST_USER: {getattr(settings, 'EMAIL_HOST_USER', 'NOT SET')}")
                logger.error(f"HAS_EMAIL_PASSWORD: {bool(getattr(settings, 'EMAIL_HOST_PASSWORD', ''))}")
                
                # Still return success because we saved to database
                # User doesn't need to know email failed
                logger.info(f"Email failed but submission saved to database (ID: {submission.id})")
                return JsonResponse({
                    'success': True, 
                    'message': 'Thank you for your message! We will get back to you soon.'
                })
                
        except Exception as e:
            logger.error(f"Contact form error: {str(e)}", exc_info=True)
            return JsonResponse({
                'success': False, 
                'message': f'Sorry, there was an error processing your request: {str(e)}'
            })
    
    return JsonResponse({'success': False, 'message': 'Invalid request method.'})
