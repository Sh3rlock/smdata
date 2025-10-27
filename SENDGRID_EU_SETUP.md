# SendGrid with EU Data Residency Setup

## Overview
This project now supports **SendGrid with EU data residency** for full GDPR compliance. This is especially important if you're sending emails from Europe or to European recipients.

## What's Different?

### Previous Setup (SMTP Only)
- Used standard SendGrid SMTP
- No EU data residency support
- API key used as password for SMTP

### New Setup (API with EU Support)
- ✅ Uses SendGrid API directly
- ✅ Supports EU data residency
- ✅ Better error handling and logging
- ✅ More features and reliability

## Setup Instructions

### Step 1: Install Dependencies
Already added to `requirements.txt`:
```
sendgrid==6.12.5
```

Install in your environment:
```bash
pip install sendgrid
```

### Step 2: Create SendGrid Account
1. Go to: https://signup.sendgrid.com/
2. Sign up for a free account
3. Verify your email

### Step 3: Create API Key
1. Log in to SendGrid dashboard
2. Navigate to **Settings** → **API Keys**
3. Click **Create API Key**
4. Name: `smdata-contact-form`
5. Permissions: **Full Access** (recommended)
6. Click **Create & View** - **COPY THE KEY IMMEDIATELY** (you can't see it again!)

### Step 4: Set Up EU Data Residency (Optional but Recommended)

To enable EU data residency, you need to:

#### Option A: Use EU Subuser (Recommended)
1. In SendGrid dashboard, go to **Settings** → **Subuser Accounts**
2. Click **Create Subuser**
3. Set **Data Residency**: Select **EU**
4. Complete the subuser creation
5. Create an API key for the EU subuser
6. Use this subuser's API key for EU compliance

#### Option B: Enable via Environment Variable
Set the flag to enable EU awareness (subuser still recommended):
```bash
SENDGRID_EU_RESIDENCY=true
```

### Step 5: Set Environment Variables on Railway

Add these to your Railway project:

```bash
# SendGrid API Key (required)
SENDGRID_API_KEY=SG.your-actual-api-key-here

# Enable EU data residency (optional, default: false)
SENDGRID_EU_RESIDENCY=true

# Default from email
DEFAULT_FROM_EMAIL=info@smdata.dev
```

**Important**: If you created an EU subuser, use the EU subuser's API key for `SENDGRID_API_KEY`.

### Step 6: Deploy

After setting environment variables, Railway will automatically redeploy. Check logs to see:

```
✅ Email configured: SendGrid API with EU data residency enabled
   Note: EU subuser must be configured in SendGrid account
```

## How It Works

### Email Flow
1. Contact form submission arrives
2. Message is saved to database (backup)
3. SendGrid API is called to send email
4. If EU residency enabled, email is processed in EU
5. Status logged for monitoring

### EU Data Residency
- Emails are processed and stored within EU data centers
- Compliant with GDPR requirements
- Automatic when using EU subuser with EU API key

## Testing

### Test Locally (Development)
In development mode, emails are printed to console:
```bash
python manage.py runserver

# Submit contact form
# Check console for email output
```

### Test in Production
1. Deploy to Railway
2. Submit test message via contact form
3. Check email at `info@smdata.dev`
4. Check Railway logs for confirmation

### Test Database Backup
1. Temporarily disable email credentials
2. Submit contact form
3. Message should still be saved to database
4. Check admin panel for message

## Fallback Behavior

### If SendGrid Fails
1. ✅ Message saved to database
2. ✅ User sees success message
3. ⚠️ Admin can check logs for error details
4. 📝 Admin can access message via Django admin

### Configuration Priority
1. **SendGrid API** (if `SENDGRID_API_KEY` is set) ← **You are here**
2. **SendGrid SMTP** (if `EMAIL_HOST_USER=apikey`)
3. **Console backend** (development mode)

## Monitoring

### Check Logs
```bash
railway logs
```

Look for messages like:
- `Email sent successfully via SendGrid with EU data residency (status: 202)`
- `EU data residency enabled - email will be processed in EU`

### Check Admin Panel
1. Go to Django admin
2. Navigate to **Contact Submissions**
3. Check `sent_to_email` field
4. Green = Email sent successfully
5. Gray = Saved to DB only

## Benefits of API vs SMTP

### API Advantages
- ✅ EU data residency support
- ✅ Better error messages
- ✅ More reliable delivery
- ✅ Detailed logging
- ✅ Future-proof for new features

### Database Backup
- ✅ No message loss
- ✅ Always accessible
- ✅ GDPR compliant storage

## Troubleshooting

### "API key not found"
- Check `SENDGRID_API_KEY` environment variable is set
- Make sure it starts with `SG.`
- Redeploy after setting variable

### "EU subuser not configured"
- Create EU subuser in SendGrid dashboard
- Get API key from EU subuser
- Use EU subuser's API key

### "Email not sending"
- Check Railway logs for errors
- Verify API key is valid
- Check message exists in admin panel (it's saved!)

### "Want to test without SendGrid"
- Messages are still saved to database
- Check admin panel for all submissions
- Set up SendGrid later

## Cost
- **SendGrid Free**: 100 emails/day forever
- **Perfect for contact forms**: Unlimited usage within free tier

## Security Notes

- API key is stored in environment variables (never in code)
- EU data residency ensures GDPR compliance
- Database backup provides redundancy
- All communications are encrypted

## Migration from SMTP

If you were previously using SendGrid SMTP:

1. Get a SendGrid API key (same account)
2. Set `SENDGRID_API_KEY` environment variable
3. Deploy - automatic migration to API backend
4. No code changes needed
5. All existing messages remain in database

## Next Steps

1. ✅ Configure SendGrid account
2. ✅ Set up EU subuser (if needed)
3. ✅ Get API key
4. ✅ Set environment variables on Railway
5. ✅ Test email delivery
6. ✅ Monitor logs for success

Your contact form now has:
- ✅ EU-compliant email delivery
- ✅ Database backup for all messages
- ✅ Reliable error handling
- ✅ Professional delivery via SendGrid API

