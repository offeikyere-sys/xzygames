import requests
import json
import random
import string

def generate_code(length=6) -> str:
    """Generate a random 6-digit verification code."""
    return ''.join(random.choices(string.digits, k=length))

def send_verification_code(to_email: str, code: str, code_type: str = "signup", smtp_config: dict = None) -> bool:
    """
    Send a verification code via Brevo API.
    Returns True if email sent successfully, False otherwise.
    """
    if smtp_config is None:
        smtp_config = {}
    
    api_key = smtp_config.get('password', '')  # Brevo API key
    sender_email = smtp_config.get('email', '')
    sender_name = "XZY Games & Software Hub"
    
    if not api_key or not sender_email:
        print(f"[EMAIL] Brevo API not configured. Code for {to_email}: {code}")
        return False
    
    try:
        # Email body (HTML + plain text)
        if code_type == "signup":
            html_content = f"""
            <html>
            <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px; text-align: center;">
                    <h1 style="color: white; margin: 0;">XZY Games</h1>
                    <p style="color: #f0f0f0; margin-top: 10px;">Games, Software & Movies Hub</p>
                </div>
                <div style="background: #f9f9f9; padding: 30px; border-radius: 10px; margin-top: 20px;">
                    <h2 style="color: #333;">Verify Your Email Address</h2>
                    <p style="color: #666; line-height: 1.6;">Thank you for signing up! Please use the verification code below to complete your registration:</p>
                    <div style="background: white; border: 2px dashed #667eea; padding: 20px; border-radius: 10px; text-align: center; margin: 20px 0;">
                        <h1 style="color: #667eea; font-size: 36px; letter-spacing: 8px; margin: 0;">{code}</h1>
                    </div>
                    <p style="color: #666; font-size: 14px;">This code will expire in 10 minutes.</p>
                    <p style="color: #666; font-size: 14px;">If you didn't create an account, please ignore this email.</p>
                </div>
                <div style="text-align: center; margin-top: 20px; color: #999; font-size: 12px;">
                    <p>© 2025 XZY Games & Software Hub. All rights reserved.</p>
                </div>
            </body>
            </html>
            """
            subject = "Verify Your Email - XZY Games"
        else:  # reset
            html_content = f"""
            <html>
            <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px; text-align: center;">
                    <h1 style="color: white; margin: 0;">XZY Games</h1>
                    <p style="color: #f0f0f0; margin-top: 10px;">Password Reset Request</p>
                </div>
                <div style="background: #f9f9f9; padding: 30px; border-radius: 10px; margin-top: 20px;">
                    <h2 style="color: #333;">Reset Your Password</h2>
                    <p style="color: #666; line-height: 1.6;">You requested to reset your password. Use the code below to proceed:</p>
                    <div style="background: white; border: 2px dashed #667eea; padding: 20px; border-radius: 10px; text-align: center; margin: 20px 0;">
                        <h1 style="color: #667eea; font-size: 36px; letter-spacing: 8px; margin: 0;">{code}</h1>
                    </div>
                    <p style="color: #666; font-size: 14px;">This code will expire in 10 minutes.</p>
                    <p style="color: #666; font-size: 14px;">If you didn't request a password reset, please ignore this email.</p>
                </div>
                <div style="text-align: center; margin-top: 20px; color: #999; font-size: 12px;">
                    <p>© 2025 XZY Games & Software Hub. All rights reserved.</p>
                </div>
            </body>
            </html>
            """
            subject = "Reset Your Password - XZY Games"
        
        # Send via Brevo API
        url = "https://api.brevo.com/v3/smtp/email"
        headers = {
            "api-key": api_key,
            "Content-Type": "application/json"
        }
        
        payload = {
            "sender": {
                "name": sender_name,
                "email": sender_email
            },
            "to": [
                {
                    "email": to_email,
                    "name": to_email.split('@')[0]
                }
            ],
            "subject": subject,
            "htmlContent": html_content
        }
        
        response = requests.post(url, headers=headers, json=payload, timeout=10)
        
        if response.status_code in [200, 201]:
            print(f"[EMAIL] Successfully sent {code_type} code to {to_email}")
            return True
        else:
            print(f"[EMAIL] Brevo API error {response.status_code}: {response.text}")
            return False
        
    except Exception as e:
        print(f"[EMAIL] Failed to send email to {to_email}: {e}")
        return False
