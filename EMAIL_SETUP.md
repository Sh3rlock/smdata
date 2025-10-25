# Email Setup Guide for SMData

## Problem
Emails are not being delivered to `info@smdata.dev` in production.

## Current Configuration
The application is configured to use **Outlook/Office 365 SMTP** for email delivery (for emails purchased through GoDaddy). However, it requires environment variables to be set.

## Setup Instructions

### 1. Get Your Email Credentials

If you purchased your email through GoDaddy:
1. Log in to your GoDaddy account
2. Go to **My Products** → **Email** → Your email account
3. Find your email address and password
4. You'll use your full email address (e.g., `info@smdata.dev`) as the username
5. Use your email account password (not your GoDaddy account password)

### 2. Set Environment Variables on Heroku

Run these commands in your terminal (replace with your actual values):

```bash
# Set your email address (the full email like info@smdata.dev)
heroku config:set EMAIL_HOST_USER=info@smdata.dev

# Set your email password
heroku config:set EMAIL_HOST_PASSWORD=your-email-password

# SMTP host (defaults to smtp.office365.com - don't change unless needed)
# Optional: heroku config:set EMAIL_HOST=smtp.office365.com

# Port (defaults to 587 - don't change unless needed)
# Optional: heroku config:set EMAIL_PORT=587

# Optional: Set custom from email address (defaults to info@smdata.dev)
heroku config:set DEFAULT_FROM_EMAIL=info@smdata.dev
```

### 3. Verify Configuration

Check your environment variables:
```bash
heroku config:get EMAIL_HOST_USER
heroku config:get EMAIL_HOST_PASSWORD
heroku config:get DEFAULT_FROM_EMAIL
```

### 4. Restart Your Application

```bash
heroku restart
```

### 5. Check Logs

After restarting, check the logs to see which email backend is configured:
```bash
heroku logs --tail
```

You should see one of these messages:
- ✅ `Email configured: SMTP backend with your-email@gmail.com for info@smdata.dev` (SUCCESS)
- ⚠️ `Email configured: Console backend (no SMTP credentials found)` (NEEDS SETUP)

### 6. Test the Contact Form

Try submitting a test message through the contact form on your website.

## Troubleshooting

### If emails still don't work:

1. **Check Heroku logs for errors:**
   ```bash
   heroku logs --tail
   ```

2. **Verify credentials are set:**
   ```bash
   heroku config
   ```

3. **Check if you're using the correct email credentials:**
   - The `EMAIL_HOST_USER` must be your full email address (e.g., `info@smdata.dev`)
   - The password should be your email account password from GoDaddy

4. **Test email manually in Django shell:**
   ```bash
   heroku run python manage.py shell
   ```
   Then in the shell:
   ```python
   from django.core.mail import send_mail
   from django.conf import settings
   send_mail('Test', 'Test message', settings.DEFAULT_FROM_EMAIL, ['info@smdata.dev'])
   ```

## Alternative SMTP Servers

If you're using a different email provider, you may need to change the SMTP settings. Here are common configurations:

### GoDaddy (Standard Email)
```bash
EMAIL_HOST=smtp.office365.com
EMAIL_PORT=587
```

### GoDaddy (Workspace Email)
```bash
EMAIL_HOST=relay-hosting.secureserver.net
EMAIL_PORT=587
# Note: May require IP whitelisting
```

### Gmail
```bash
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
# Requires app password
```

### SendGrid
```bash
EMAIL_HOST=smtp.sendgrid.net
EMAIL_PORT=587
EMAIL_HOST_USER=apikey
EMAIL_HOST_PASSWORD=your-sendgrid-api-key
```

## Security Notes

- Never commit your email credentials to Git
- Always use environment variables for sensitive information
- Use strong passwords for your email accounts
- Consider using services like SendGrid for better deliverability and deliverability tracking
