# Email Setup Guide for SMData

## Hosting Platform
This guide is configured for **Railway** hosting. 

## Problem
Emails are not being delivered to `info@smdata.dev` in production.

## Current Configuration
The application is configured to use **Outlook/Office 365 SMTP** for email delivery (for emails purchased through GoDaddy). However, it requires environment variables to be set on your Railway deployment.

## Setup Instructions

### 1. Get Your Email Credentials

If you purchased your email through GoDaddy:
1. Log in to your GoDaddy account
2. Go to **My Products** → **Email** → Your email account
3. Find your email address and password
4. You'll use your full email address (e.g., `info@smdata.dev`) as the username
5. Use your email account password (not your GoDaddy account password)

### 2. Set Environment Variables on Railway

You can set environment variables through the Railway dashboard or CLI:

**Option 1: Railway Dashboard (Recommended)**
1. Go to your Railway project dashboard
2. Select your service
3. Go to the **Variables** tab
4. Add these variables:
   - `EMAIL_HOST_USER` = `info@smdata.dev`
   - `EMAIL_HOST_PASSWORD` = `your-email-password`
   - `DEFAULT_FROM_EMAIL` = `info@smdata.dev` (optional, defaults to info@smdata.dev)
   - `EMAIL_HOST` = `smtp.office365.com` (optional, if needed)
   - `EMAIL_PORT` = `587` (optional, if needed)

**Option 2: Railway CLI**

```bash
# Set your email address (the full email like info@smdata.dev)
railway variables set EMAIL_HOST_USER=info@smdata.dev

# Set your email password
railway variables set EMAIL_HOST_PASSWORD=your-email-password

# Optional: Set custom from email address
railway variables set DEFAULT_FROM_EMAIL=info@smdata.dev

# Optional: Set SMTP host (defaults to smtp.office365.com)
railway variables set EMAIL_HOST=smtp.office365.com

# Optional: Set SMTP port (defaults to 587)
railway variables set EMAIL_PORT=587
```

### 3. Verify Configuration

**In Railway Dashboard:**
- Go to your service → **Variables** tab
- Verify all variables are set correctly

**Using Railway CLI:**
```bash
railway variables
```

### 4. Deploy/Restart Your Application

Changes to environment variables will automatically trigger a redeploy in Railway. If you need to manually restart:

**In Railway Dashboard:**
- Go to your service → Click the three dots menu → **Restart**

**Using Railway CLI:**
```bash
railway restart
```

### 5. Check Logs

After deployment, check the logs to see which email backend is configured:

**In Railway Dashboard:**
- Go to your service → **Deployments** tab → Click on the latest deployment → View logs

**Using Railway CLI:**
```bash
railway logs
```

You should see one of these messages:
- ✅ `Email configured: SMTP backend with your-email@gmail.com for info@smdata.dev` (SUCCESS)
- ⚠️ `Email configured: Console backend (no SMTP credentials found)` (NEEDS SETUP)

### 6. Test the Contact Form

Try submitting a test message through the contact form on your website.

## Troubleshooting

### If emails still don't work:

1. **Check Railway logs for errors:**
   - In Railway Dashboard: Service → **Deployments** → Latest deployment → View logs
   - Or use CLI: `railway logs`

2. **Verify credentials are set:**
   - In Railway Dashboard: Service → **Variables** tab
   - Or use CLI: `railway variables`

3. **Check if you're using the correct email credentials:**
   - The `EMAIL_HOST_USER` must be your full email address (e.g., `info@smdata.dev`)
   - The password should be your email account password from GoDaddy

4. **Test email manually in Django shell:**
   ```bash
   railway run python manage.py shell
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
