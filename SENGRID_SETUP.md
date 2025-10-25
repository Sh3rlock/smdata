# SendGrid Setup Guide for Railway

## Problem
Railway blocks most outbound SMTP connections (ports 25, 80, 587, 465). You need a service that uses API/HTTP instead.

## Solution: SendGrid
SendGrid is a transactional email service that works perfectly with Railway. **Free tier: 100 emails/day**

## Quick Setup (5 minutes)

### Step 1: Create SendGrid Account
1. Go to https://signup.sendgrid.com/
2. Sign up (free account)
3. Verify your email

### Step 2: Create API Key
1. Go to **Settings** → **API Keys**
2. Click **Create API Key**
3. Name it: `smdata-contact-form`
4. Permissions: **Full Access** (or just "Mail Send")
5. Click **Create** - copy the key immediately (you'll never see it again!)

### Step 3: Verify Sender Identity
1. Go to **Settings** → **Sender Authentication**
2. Choose "Verify a Single Sender" (for testing)
3. Fill in your email: `info@smdata.dev`
4. Verify your email address

### Step 4: Set Railway Environment Variables

In Railway Dashboard → Your Service → Variables:

```
EMAIL_HOST_USER=apikey
EMAIL_HOST_PASSWORD=SG.your-actual-api-key-here
DEFAULT_FROM_EMAIL=info@smdata.dev
```

**Replace `SG.your-actual-api-key-here` with your actual SendGrid API key!**

### Step 5: Deploy

Railway will automatically redeploy. Check logs - you should see:
```
✅ Email configured: SendGrid SMTP
```

### Step 6: Test

Submit the contact form - it should work!

## Alternative: Mailgun

If you prefer Mailgun (also free tier):

1. Sign up at https://www.mailgun.com/
2. Add environment variables:
```
EMAIL_HOST_USER=your-mailgun-smtp-username
EMAIL_HOST_PASSWORD=your-mailgun-smtp-password
EMAIL_HOST=smtp.mailgun.org
EMAIL_PORT=587
```

## Why SendGrid Works
- Uses standard SMTP port 587
- Railway doesn't block this particular service
- Reliable delivery
- Free tier covers small sites
- Easy setup

## Cost
- SendGrid Free: 100 emails/day forever
- Perfect for contact forms!
