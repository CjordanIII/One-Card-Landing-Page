import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const { email, message } = await req.json();

    if (!email || !message) {
      return NextResponse.json(
        { error: "Email and message required" },
        { status: 400 }
      );
    }

    if (
      !process.env.RESEND_API_KEY ||
      !process.env.SUPPORT_TO_EMAIL ||
      !process.env.SUPPORT_FROM_EMAIL
    ) {
      return NextResponse.json(
        { error: "Missing RESEND env vars" },
        { status: 500 }
      );
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    const html = `
    <div style="font-family:'Segoe UI',Roboto,Arial,sans-serif;background-color:#000;padding:24px;color:#e5e5e5;border-radius:12px;">
      <h2 style="color:#34d399;margin-bottom:8px;">💳 One Card Support Message</h2>
      <p style="margin:0 0 8px 0;font-size:14px;">New message from the One Card page.</p>
      <div style="background:#111;padding:12px;border-radius:8px;margin-top:12px;border:1px solid #222;">
        <p><b style="color:#34d399;">From:</b> ${email}</p>
        <p><b style="color:#34d399;">Message:</b></p>
        <pre style="white-space:pre-wrap;font-size:14px;line-height:1.5;color:#fafafa;">${String(message).replace(/</g, "&lt;")}</pre>
      </div>
      <p style="margin-top:16px;font-size:12px;color:#9ca3af;">© ${new Date().getFullYear()} One Card</p>
    </div>`.trim();

    const { error } = await resend.emails.send({
      from: `One Card <${process.env.SUPPORT_FROM_EMAIL!}>`,
      to: [process.env.SUPPORT_TO_EMAIL!],
      // If the SDK expects camelCase, switch to replyTo
      replyTo: email,
      subject: `One Card – Support message from ${email}`,
      html,
    });

    if (error) {
      return NextResponse.json({ error: String(error) }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json(
      { error: e?.message || "Server error" },
      { status: 500 }
    );
  }
}
