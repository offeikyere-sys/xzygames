import os
import random
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Read configuration from environment variables with fallback to api_keys.json
def _get_config(key: str, default: str = ""):
    """Read from env var first, then fall back to api_keys.json for backward compatibility."""
    env_var = key.upper()
    val = os.environ.get(env_var)
    if val:
        return val
    # Fallback to json file
    try:
        import json
        BASE_DIR = os.path.dirname(os.path.abspath(__file__))
        with open(os.path.join(BASE_DIR, "api_keys.json")) as f:
            cfg = json.load(f)
        # Handle nested keys like "email.address"
        parts = key.split(".")
        for part in parts:
            if isinstance(cfg, dict):
                cfg = cfg.get(part, {})
        return cfg if isinstance(cfg, str) else str(cfg) if cfg else default
    except:
        return default


def generate_code(length: int = 6) -> str:
    """Generate a numeric verification code."""
    return "".join(str(random.randint(0, 9)) for _ in range(length))


def send_verification_code(to_email: str, code: str, purpose: str = "signup") -> bool:
    """
    Send a verification code via Resend.
    Resend free tier can only send to the owner email (offeikyere@gmail.com)
    unless a custom domain is verified.
    So we send to the owner and also try the recipient — 
    the code is always shown on screen in the frontend as a fallback.
    Returns True if sent successfully, False otherwise.
    """
    api_key = _get_config("resend_api_key")
    owner_email = _get_config("email.address", "offeikyere@gmail.com")

    if not api_key:
        logger.error("No Resend API key configured")
        return False

    if purpose == "signup":
        subject = "XZY Games & Software Hub - Verify Your Email"
        html_body = f"""
        <html>
        <body style="font-family: Arial, sans-serif; background: #000; color: #fff; padding: 20px;">
            <div style="max-width: 500px; margin: 0 auto; background: #111; border: 1px solid #222; border-radius: 16px; padding: 30px;">
                <h2 style="color: #3b82f6; margin-bottom: 20px;">XZY Games & Software Hub</h2>
                <p>New signup request from <strong>{to_email}</strong>. Use this code to complete signup:</p>
                <div style="text-align: center; font-size: 36px; font-weight: bold; letter-spacing: 8px; color: #3b82f6; margin: 30px 0; padding: 20px; background: #000; border: 1px solid #222; border-radius: 12px;">
                    {code}
                </div>
                <p style="color: #888; font-size: 12px;">This code expires in 10 minutes.</p>
            </div>
        </body>
        </html>
        """
    elif purpose == "reset":
        subject = "XZY Games & Software Hub - Password Reset Code"
        html_body = f"""
        <html>
        <body style="font-family: Arial, sans-serif; background: #000; color: #fff; padding: 20px;">
            <div style="max-width: 500px; margin: 0 auto; background: #111; border: 1px solid #222; border-radius: 16px; padding: 30px;">
                <h2 style="color: #3b82f6; margin-bottom: 20px;">XZY Games & Software Hub</h2>
                <p>Use the code below to reset your password:</p>
                <div style="text-align: center; font-size: 36px; font-weight: bold; letter-spacing: 8px; color: #3b82f6; margin: 30px 0; padding: 20px; background: #000; border: 1px solid #222; border-radius: 12px;">
                    {code}
                </div>
                <p style="color: #888; font-size: 12px;">This code expires in 10 minutes. If you didn't request this, ignore this email.</p>
            </div>
        </body>
        </html>
        """
    else:
        subject = "XZY Games & Software Hub - Your Code"
        html_body = f"Your verification code is: {code}"

    try:
        import resend
        resend.api_key = api_key

        # Send using owner email as sender (must be verified in Resend)
        r = resend.Emails.send({
            "from": f"XZY Games <{owner_email}>",
            "to": [to_email],
            "subject": subject,
            "html": html_body,
        })
        logger.info(f"Email sent via Resend to {owner_email} for {to_email}: {r}")
        return True
    except Exception as e:
        logger.error(f"Failed to send email via Resend: {e}")
        return False
