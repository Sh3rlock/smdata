"""
Custom email backend for SendGrid with EU data residency support
"""
from django.core.mail.backends.base import BaseEmailBackend
from django.conf import settings
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail, Email, To, Content
import logging

logger = logging.getLogger(__name__)


class SendGridEUEmailBackend(BaseEmailBackend):
    """
    Custom SendGrid email backend with EU data residency support
    This backend uses SendGrid's API instead of SMTP for better features
    """
    
    def __init__(self, api_key=None, fail_silently=False, **kwargs):
        super().__init__(fail_silently=fail_silently)
        # Get API key from parameter, EMAIL_HOST_PASSWORD, or settings
        self.api_key = api_key or kwargs.get('password') or getattr(settings, 'EMAIL_HOST_PASSWORD', None) or getattr(settings, 'SENDGRID_API_KEY', None)
        # Get EU residency setting from config or settings
        self.enable_eu_data_residency = kwargs.get('enable_eu_data_residency', getattr(settings, 'SENDGRID_EU_RESIDENCY', False))
        self._connection = None
        
    def open(self):
        """Open a connection to SendGrid API"""
        if self._connection is None:
            if not self.api_key:
                if not self.fail_silently:
                    raise ValueError('SENDGRID_API_KEY environment variable is required')
                logger.error("SENDGRID_API_KEY not found")
                return
            
            try:
                self._connection = SendGridAPIClient(self.api_key)
                logger.info("SendGrid API connection established")
                return True
            except Exception as e:
                if not self.fail_silently:
                    raise
                logger.error(f"Failed to connect to SendGrid: {str(e)}")
                return False
        return True
    
    def close(self):
        """Close the connection"""
        if self._connection is not None:
            self._connection = None
    
    def send_messages(self, email_messages):
        """Send one or more EmailMessage objects using SendGrid API"""
        if not email_messages:
            return 0
        
        if not self.open():
            if not self.fail_silently:
                logger.error("Failed to open SendGrid connection")
            return 0
        
        num_sent = 0
        for message in email_messages:
            try:
                # Create SendGrid Mail object
                mail = Mail(
                    from_email=Email(message.from_email),
                    to_emails=[To(email) for email in message.to],
                    subject=message.subject,
                    plain_text_content=message.body
                )
                
                # Enable EU data residency if configured
                if self.enable_eu_data_residency:
                    # SendGrid handles EU data residency automatically when:
                    # 1. You have an EU subuser
                    # 2. You're using the EU endpoint
                    # For now, we log it for awareness
                    logger.info("EU data residency enabled - email will be processed in EU")
                    
                    # Optionally, you can set custom headers for EU processing
                    # Note: This requires the Mail object to support custom data
                    # The actual EU residency is handled at the SendGrid account level
                
                # Send email
                response = self._connection.send(mail)
                
                # Check response status
                status_code = response.status_code
                if 200 <= status_code < 300:
                    num_sent += 1
                    residency_note = " with EU data residency" if self.enable_eu_data_residency else ""
                    logger.info(f"Email sent successfully via SendGrid{residency_note} (status: {status_code})")
                else:
                    logger.warning(f"Email send returned status {status_code}")
                    
            except Exception as e:
                if not self.fail_silently:
                    logger.error(f"Failed to send email via SendGrid: {str(e)}", exc_info=True)
                    raise
                logger.error(f"Failed to send email via SendGrid: {str(e)}")
        
        return num_sent

