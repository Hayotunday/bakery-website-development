import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

// Email transport configuration
const createTransporter = () => {
  // Using Gmail with App Password (recommended approach)
  // You can also use other SMTP services
  return nodemailer.createTransport({
    service: process.env.SMTP_SERVICE || "gmail",
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || "587"),
    secure: process.env.SMTP_SECURE === "true", // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });
};

// Email template for owner notification (general inquiries)
const ownerEmailTemplate = (
  name: string,
  email: string,
  eventDate: string,
  serviceType: string,
  vision: string,
) => {
  const serviceTypeLabels: Record<string, string> = {
    "custom-wedding-cake": "Custom Wedding Cake",
    "event-styling": "Event Styling & Decor",
    "corporate-catering": "Corporate Catering",
    "private-celebration": "Private Celebration",
  };

  return `
    <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
      <h2 style="color: #0066cc;">New Inquiry from Perfect White Bakery Website</h2>
      
      <p>You have received a new inquiry from a potential client:</p>
      
      <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <p><strong>Client Name:</strong> ${name}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        <p><strong>Event Date:</strong> ${eventDate}</p>
        <p><strong>Service Type:</strong> ${serviceTypeLabels[serviceType] || serviceType}</p>
        <p><strong>Vision/Requirements:</strong></p>
        <p style="white-space: pre-wrap; background-color: white; padding: 10px; border-left: 4px solid #0066cc;">
          ${vision}
        </p>
      </div>
      
      <p>Please contact the client at your earliest convenience to discuss their event.</p>
      
      <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;" />
      <p style="font-size: 12px; color: #999;">
        This is an automated email from your Perfect White Bakery website contact form.
      </p>
    </div>
  `;
};

// Email template for refresher form submissions
const ownerEmailTemplateRefresher = (form: Record<string, any>) => {
  const rows = Object.entries(form)
    .map(
      ([k, v]) =>
        `<tr><td style="padding:8px;border:1px solid #eee;font-weight:600;background:#f9f9f9">${k}</td><td style="padding:8px;border:1px solid #eee">${
          v ?? ""
        }</td></tr>`,
    )
    .join("");

  return `
    <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
      <h2 style="color: #0066cc;">New Refresher Registration - Perfect White Bakery</h2>
      <p>A user submitted the refresher registration form. Details are below:</p>
      <table style="border-collapse:collapse;width:100%;margin-top:16px">${rows}</table>
      <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;" />
      <p style="font-size: 12px; color: #999;">This is an automated email from your Perfect White Bakery website refresher form.</p>
    </div>
  `;
};

// Email template for client confirmation
const clientEmailTemplate = (name: string, serviceType: string) => {
  const serviceTypeLabels: Record<string, string> = {
    "custom-wedding-cake": "Custom Wedding Cake",
    "event-styling": "Event Styling & Decor",
    "corporate-catering": "Corporate Catering",
    "private-celebration": "Private Celebration",
  };

  return `
    <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
      <h2 style="color: #0066cc;">Thank You for Your Inquiry!</h2>
      
      <p>Dear ${name},</p>
      
      <p>We have received your inquiry for <strong>${serviceTypeLabels[serviceType] || serviceType}</strong> services at Perfect White Bakery.</p>
      
      <p>Our specialist team will review your request and contact you within 24-48 hours to discuss your event in detail.</p>
      
      <div style="background-color: #f0f7ff; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #0066cc;">
        <p style="margin: 0;"><strong>Our Contact Details:</strong></p>
        <p style="margin: 5px 0;">📞 Phone: +234 802 7815 383</p>
        <p style="margin: 5px 0;">📧 Email: oyegokemojisola@gmail.com</p>
        <p style="margin: 5px 0;">📍 Location: Ikorodu, Lagos, Nigeria</p>
      </div>
      
      <p>If you have any urgent questions in the meantime, feel free to contact us directly using the details above.</p>
      
      <p>Best regards,<br />
      <strong>Perfect White Bakery Team</strong></p>
      
      <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;" />
      <p style="font-size: 12px; color: #999;">
        This is an automated confirmation email. Please do not reply to this email.
      </p>
    </div>
  `;
};

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const serviceType = body.serviceType || "";

    // Handle refresher-class submissions separately
    if (serviceType === "refresher-class") {
      const { fullName, email } = body;
      if (!fullName || !email) {
        return NextResponse.json(
          { error: "Missing required fields" },
          { status: 400 },
        );
      }

      // basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return NextResponse.json(
          { error: "Invalid email format" },
          { status: 400 },
        );
      }

      if (!process.env.SMTP_USER || !process.env.SMTP_PASSWORD) {
        console.error("SMTP credentials not configured");
        return NextResponse.json(
          {
            error:
              "Email service is not properly configured. Please contact the website administrator.",
          },
          { status: 500 },
        );
      }

      const transporter = createTransporter();

      // send owner email with full form body
      await transporter.sendMail({
        from: process.env.SMTP_USER,
        to: process.env.OWNER_EMAIL || "oyegokemojisola@gmail.com",
        subject: `Refresher Registration: ${fullName}`,
        html: ownerEmailTemplateRefresher(body),
        replyTo: email,
      });

      // confirmation to registrant
      await transporter.sendMail({
        to: email,
        from: process.env.SMTP_USER,
        subject: "Refresher Registration Received - Perfect White Bakery",
        html: `<div style="font-family:Arial,sans-serif"><p>Dear ${fullName},</p><p>Thank you for registering for our refresher class. We'll contact you shortly with next steps.</p><p>— Perfect White Bakery</p></div>`,
      });

      return NextResponse.json(
        { success: true, message: "Registration sent" },
        { status: 200 },
      );
    }

    // Default: existing inquiry flow
    const { name, email, eventDate, vision } = body;
    const serviceTypeValue = serviceType;

    if (!name || !email || !eventDate || !serviceTypeValue || !vision) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 },
      );
    }

    // Check if SMTP credentials are configured
    if (!process.env.SMTP_USER || !process.env.SMTP_PASSWORD) {
      console.error("SMTP credentials not configured");
      return NextResponse.json(
        {
          error:
            "Email service is not properly configured. Please contact the website administrator.",
        },
        { status: 500 },
      );
    }

    const transporter = createTransporter();

    // Send email to owner
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: process.env.OWNER_EMAIL || "oyegokemojisola@gmail.com",
      subject: `New Inquiry from ${name} - Perfect White Bakery`,
      html: ownerEmailTemplate(
        name,
        email,
        eventDate,
        serviceTypeValue,
        vision,
      ),
      replyTo: email,
    });

    // Send confirmation email to client
    await transporter.sendMail({
      to: email,
      from: process.env.SMTP_USER,
      subject: "Thank You for Your Inquiry - Perfect White Bakery",
      html: clientEmailTemplate(name, serviceTypeValue),
    });

    return NextResponse.json(
      { success: true, message: "Inquiry sent successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Email sending error:", error);
    return NextResponse.json(
      { error: "Failed to send inquiry. Please try again later." },
      { status: 500 },
    );
  }
}
