import { NextResponse } from "next/server";

export const runtime = "nodejs"; // ensures Node runtime for env + fetch

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Email required" }, { status: 400 });
    }

    const apiKey = process.env.MAILERLITE_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "MAILERLITE_API_KEY missing" },
        { status: 500 }
      );
    }

    // Create/attach subscriber in MailerLite
    const resp = await fetch("https://connect.mailerlite.com/api/subscribers", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        groups: process.env.MAILERLITE_GROUP_ID
          ? [process.env.MAILERLITE_GROUP_ID]
          : [],
      }),
    });

    if (!resp.ok) {
      const err = await resp.text();
      return NextResponse.json(
        { error: `MailerLite error: ${err || resp.statusText}` },
        { status: 502 }
      );
    }

    // Optional welcome email via Resend (non-fatal if it fails)
    if (process.env.RESEND_API_KEY && process.env.SUPPORT_FROM_EMAIL) {
      const { Resend } = await import("resend");
      const resend = new Resend(process.env.RESEND_API_KEY);

      const html = `
      <div style="font-family:'Segoe UI',Roboto,Arial,sans-serif;background-color:#000;padding:24px;color:#e5e5e5;border-radius:12px;text-align:center;">
        <h2 style="color:#34d399;margin-bottom:8px;">Welcome to One Card 💳</h2>
        <p style="font-size:15px;color:#d4d4d4;">Thanks for subscribing! You're on the early access list.</p>
        <a href="https://onecard.app" style="display:inline-block;margin-top:16px;padding:10px 20px;background-color:#34d399;color:#000;font-weight:600;border-radius:6px;text-decoration:none;">Visit One Card</a>
        <p style="margin-top:20px;font-size:12px;color:#9ca3af;">© ${new Date().getFullYear()} One Card</p>
      </div>`.trim();

      const result = await resend.emails.send({
        from: `One Card <${process.env.SUPPORT_FROM_EMAIL!}>`,
        to: [email],
        subject: "Welcome to One Card – You're In!",
        html,
      });

      if (result.error) {
        console.error("Resend error:", result.error);
        // don't fail the subscription for a welcome-email error
      }
    }

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json(
      { error: e?.message || "Server error" },
      { status: 500 }
    );
  }
}