/**
 * Email Template Design Preview
 * This is a visual representation of the email template.
 * For actual email sending, use this as a reference for your email service.
 */

import React from 'react';

interface ActionLinkEmailProps {
  userName?: string;
  actionTitle: string;
  actionDescription: string;
  buttonText: string;
  buttonLink: string;
  footerNote?: string;
}

// Preview component for the app
export const ActionLinkEmailPreview = ({
  userName = "Athlete",
  actionTitle = "Verify Your Email",
  actionDescription = "Click the button below to verify your email address and complete your registration.",
  buttonText = "Verify Email",
  buttonLink = "#",
  footerNote = "If you didn't request this, you can safely ignore this email."
}: ActionLinkEmailProps) => {
  return (
    <div className="bg-muted/50 p-8 rounded-lg">
      <div className="max-w-[600px] mx-auto bg-background rounded-lg overflow-hidden shadow-2xl border border-border">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary via-orange-500 to-primary p-1">
          <div className="bg-background px-8 py-6">
            <div className="flex items-center justify-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-orange-500 flex items-center justify-center">
                <span className="text-white font-black text-lg">CN</span>
              </div>
              <span className="text-xl font-bold text-foreground tracking-tight">
                Currently Natty
              </span>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="px-8 py-10">
          {/* Greeting */}
          <p className="text-muted-foreground text-base mb-6">
            Hey {userName},
          </p>

          {/* Main Title */}
          <h1 className="text-2xl font-bold text-foreground mb-4">
            {actionTitle}
          </h1>

          {/* Description */}
          <p className="text-muted-foreground text-base leading-relaxed mb-8">
            {actionDescription}
          </p>

          {/* CTA Button */}
          <div className="text-center mb-8">
            <a
              href={buttonLink}
              className="inline-block bg-gradient-to-r from-primary to-orange-500 text-white font-semibold px-8 py-4 rounded-lg text-base hover:opacity-90 transition-opacity shadow-lg shadow-primary/25"
            >
              {buttonText}
            </a>
          </div>

          {/* Alternative Link */}
          <div className="bg-muted/50 rounded-lg p-4 mb-8">
            <p className="text-sm text-muted-foreground mb-2">
              Or copy and paste this link into your browser:
            </p>
            <p className="text-sm text-primary break-all font-mono">
              {buttonLink || "https://currentlynatty.com/verify?token=abc123"}
            </p>
          </div>

          {/* Footer Note */}
          <p className="text-sm text-muted-foreground/70 italic">
            {footerNote}
          </p>
        </div>

        {/* Divider */}
        <div className="px-8">
          <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        </div>

        {/* Footer */}
        <div className="px-8 py-6 text-center">
          <p className="text-xs text-muted-foreground mb-3">
            © 2024 Currently Natty. All rights reserved.
          </p>
          <div className="flex items-center justify-center gap-4 text-xs">
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              Website
            </a>
            <span className="text-border">•</span>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              YouTube
            </a>
            <span className="text-border">•</span>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              Instagram
            </a>
          </div>
          <p className="text-[10px] text-muted-foreground/50 mt-4">
            You received this email because you signed up at Currently Natty.
          </p>
        </div>
      </div>
    </div>
  );
};

// Raw HTML template for email services (inline styles required for email clients)
export const getActionLinkEmailHTML = ({
  userName = "Athlete",
  actionTitle = "Verify Your Email",
  actionDescription = "Click the button below to verify your email address.",
  buttonText = "Verify Email",
  buttonLink = "#",
  footerNote = "If you didn't request this, you can safely ignore this email."
}: ActionLinkEmailProps): string => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${actionTitle}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0a0a0a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;">
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #0a0a0a;">
    <tr>
      <td style="padding: 40px 20px;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="margin: 0 auto; background-color: #141414; border-radius: 12px; overflow: hidden; border: 1px solid #262626;">
          
          <!-- Gradient Header Bar -->
          <tr>
            <td style="height: 4px; background: linear-gradient(90deg, #dc2626, #f97316, #dc2626);"></td>
          </tr>
          
          <!-- Logo Header -->
          <tr>
            <td style="padding: 24px 32px; text-align: center;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin: 0 auto;">
                <tr>
                  <td style="width: 40px; height: 40px; background: linear-gradient(135deg, #dc2626, #f97316); border-radius: 50%; text-align: center; vertical-align: middle;">
                    <span style="color: #ffffff; font-weight: 900; font-size: 18px;">CN</span>
                  </td>
                  <td style="padding-left: 12px;">
                    <span style="color: #fafafa; font-size: 20px; font-weight: 700; letter-spacing: -0.5px;">Currently Natty</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Body Content -->
          <tr>
            <td style="padding: 0 32px 40px 32px;">
              <!-- Greeting -->
              <p style="color: #a1a1aa; font-size: 16px; margin: 0 0 24px 0;">
                Hey ${userName},
              </p>
              
              <!-- Title -->
              <h1 style="color: #fafafa; font-size: 24px; font-weight: 700; margin: 0 0 16px 0;">
                ${actionTitle}
              </h1>
              
              <!-- Description -->
              <p style="color: #a1a1aa; font-size: 16px; line-height: 1.6; margin: 0 0 32px 0;">
                ${actionDescription}
              </p>
              
              <!-- CTA Button -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin: 0 auto 32px auto;">
                <tr>
                  <td style="background: linear-gradient(90deg, #dc2626, #f97316); border-radius: 8px; box-shadow: 0 4px 14px rgba(220, 38, 38, 0.3);">
                    <a href="${buttonLink}" target="_blank" style="display: inline-block; padding: 16px 32px; color: #ffffff; font-size: 16px; font-weight: 600; text-decoration: none;">
                      ${buttonText}
                    </a>
                  </td>
                </tr>
              </table>
              
              <!-- Alternative Link Box -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #1a1a1a; border-radius: 8px; margin-bottom: 32px;">
                <tr>
                  <td style="padding: 16px;">
                    <p style="color: #71717a; font-size: 14px; margin: 0 0 8px 0;">
                      Or copy and paste this link into your browser:
                    </p>
                    <p style="color: #dc2626; font-size: 14px; margin: 0; word-break: break-all; font-family: monospace;">
                      ${buttonLink}
                    </p>
                  </td>
                </tr>
              </table>
              
              <!-- Footer Note -->
              <p style="color: #52525b; font-size: 14px; font-style: italic; margin: 0;">
                ${footerNote}
              </p>
            </td>
          </tr>
          
          <!-- Divider -->
          <tr>
            <td style="padding: 0 32px;">
              <div style="height: 1px; background: linear-gradient(90deg, transparent, #262626, transparent);"></div>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="padding: 24px 32px; text-align: center;">
              <p style="color: #71717a; font-size: 12px; margin: 0 0 12px 0;">
                © 2024 Currently Natty. All rights reserved.
              </p>
              <p style="margin: 0 0 16px 0;">
                <a href="#" style="color: #71717a; font-size: 12px; text-decoration: none; margin: 0 8px;">Website</a>
                <span style="color: #262626;">•</span>
                <a href="#" style="color: #71717a; font-size: 12px; text-decoration: none; margin: 0 8px;">YouTube</a>
                <span style="color: #262626;">•</span>
                <a href="#" style="color: #71717a; font-size: 12px; text-decoration: none; margin: 0 8px;">Instagram</a>
              </p>
              <p style="color: #3f3f46; font-size: 10px; margin: 0;">
                You received this email because you signed up at Currently Natty.
              </p>
            </td>
          </tr>
          
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
};

export default ActionLinkEmailPreview;
