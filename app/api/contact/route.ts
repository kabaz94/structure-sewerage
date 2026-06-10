import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { contactFormSchema } from "@/lib/validations";

const resend = new Resend(process.env.RESEND_API_KEY);
const COMPANY_EMAIL = process.env.COMPANY_EMAIL || "info@structuresewerage.com";
const COMPANY_NAME = process.env.COMPANY_NAME || "Structure Sewerage";

// Simple in-memory rate limiting
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_MAX = Number(process.env.RATE_LIMIT_MAX) || 5;
const RATE_LIMIT_WINDOW_MS = Number(process.env.RATE_LIMIT_WINDOW_MS) || 60000;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return false;
  }

  entry.count++;
  return true;
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      "unknown";

    // Rate limiting
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    // Parse body
    const body = await request.json();

    // Validate with Zod
    const result = contactFormSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: result.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { fullName, companyName, email, phone, service, message, honeypot } =
      result.data;

    // Honeypot check — silently succeed to fool bots
    if (honeypot && honeypot.length > 0) {
      return NextResponse.json({ success: true });
    }

    // Send admin notification email
    await resend.emails.send({
      from: `${COMPANY_NAME} <noreply@structuresewerage.com>`,
      to: [COMPANY_EMAIL],
      subject: `New Website Inquiry - ${fullName}`,
      html: `
        <h1 style="color:#00204f;">New Website Inquiry</h1>
        <table style="border-collapse:collapse;width:100%;max-width:600px;">
          <tr><td style="padding:8px;font-weight:bold;color:#44474f;">Name:</td><td style="padding:8px;">${fullName}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;color:#44474f;">Company:</td><td style="padding:8px;">${companyName || "N/A"}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;color:#44474f;">Email:</td><td style="padding:8px;">${email}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;color:#44474f;">Phone:</td><td style="padding:8px;">${phone}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;color:#44474f;">Service:</td><td style="padding:8px;">${service}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;color:#44474f;">Date:</td><td style="padding:8px;">${new Date().toLocaleString("en-MY")}</td></tr>
        </table>
        <h2 style="color:#00204f;">Message:</h2>
        <p style="line-height:1.6;">${message.replace(/\n/g, "<br/>")}</p>
      `,
    });

    // Send auto-reply to visitor
    await resend.emails.send({
      from: `${COMPANY_NAME} <noreply@structuresewerage.com>`,
      to: [email],
      subject: `Thank You for Contacting ${COMPANY_NAME}`,
      html: `
        <div style="max-width:600px;margin:0 auto;font-family:Arial,sans-serif;">
          <h1 style="color:#00204f;">Thank You for Your Inquiry</h1>
          <p>Dear ${fullName},</p>
          <p>We have received your inquiry regarding <strong>${service}</strong>. Our engineering team will review your requirements and respond within <strong>2 business hours</strong> during working hours.</p>
          <p>For urgent matters, please call our 24/7 emergency hotline.</p>
          <hr style="border:1px solid #e1e3e4;margin:24px 0;" />
          <p style="color:#44474f;font-size:14px;">
            <strong>${COMPANY_NAME}</strong><br/>
            Precision Engineering & Industrial Maintenance<br/>
          </p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send message. Please try again later." },
      { status: 500 }
    );
  }
}
