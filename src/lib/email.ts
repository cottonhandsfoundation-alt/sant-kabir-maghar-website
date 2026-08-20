import "server-only";
import nodemailer from "nodemailer";

function getTransport() {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASSWORD) {
    return null;
  }
  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT ?? 587),
    secure: Number(SMTP_PORT ?? 587) === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASSWORD },
  });
}

/**
 * Sends an email if SMTP is configured; otherwise logs to the server console
 * so local development and demos still work without real credentials. Never
 * throws — a failed/unconfigured email must not block a donation, contact
 * form submission, etc.
 */
export async function sendEmail(options: {
  to: string;
  subject: string;
  html: string;
  text?: string;
}) {
  const transport = getTransport();
  const from = process.env.SMTP_FROM || "Sant Kabir Sewa Samiti <no-reply@example.org>";

  if (!transport) {
    console.info(
      `[email:not-configured] Would send to ${options.to}: "${options.subject}". Set SMTP_* env vars to enable real delivery.`
    );
    return { sent: false, reason: "smtp_not_configured" as const };
  }

  try {
    await transport.sendMail({
      from,
      to: options.to,
      subject: options.subject,
      html: options.html,
      text: options.text,
    });
    return { sent: true as const };
  } catch (error) {
    console.error("[email:send-failed]", error);
    return { sent: false, reason: "send_error" as const };
  }
}

export function donationReceiptEmail(opts: {
  donorName: string;
  donationId: string;
  receiptNumber: string;
  amountFormatted: string;
  purpose: string;
  dateFormatted: string;
  orgName: string;
}) {
  const { donorName, donationId, receiptNumber, amountFormatted, purpose, dateFormatted, orgName } =
    opts;
  return {
    subject: `Donation Receipt — ${receiptNumber} — ${orgName}`,
    html: `
      <div style="font-family: Georgia, serif; max-width: 560px; margin: 0 auto; color: #2a2118;">
        <h2 style="color:#a8511f;">Thank you, ${escapeHtml(donorName)}</h2>
        <p>Your donation to ${escapeHtml(orgName)} has been received successfully.</p>
        <table style="width:100%; border-collapse: collapse; margin: 16px 0;">
          <tr><td style="padding:6px 0; color:#7a6a55;">Donation ID</td><td style="padding:6px 0; text-align:right;">${escapeHtml(donationId)}</td></tr>
          <tr><td style="padding:6px 0; color:#7a6a55;">Receipt Number</td><td style="padding:6px 0; text-align:right;">${escapeHtml(receiptNumber)}</td></tr>
          <tr><td style="padding:6px 0; color:#7a6a55;">Amount</td><td style="padding:6px 0; text-align:right;">${escapeHtml(amountFormatted)}</td></tr>
          <tr><td style="padding:6px 0; color:#7a6a55;">Purpose</td><td style="padding:6px 0; text-align:right;">${escapeHtml(purpose)}</td></tr>
          <tr><td style="padding:6px 0; color:#7a6a55;">Date</td><td style="padding:6px 0; text-align:right;">${escapeHtml(dateFormatted)}</td></tr>
        </table>
        <p style="color:#7a6a55; font-size: 14px;">You can download a formatted receipt anytime from the link in your confirmation page. This email is an automated confirmation and does not itself constitute a tax document unless indicated on the receipt.</p>
      </div>
    `,
    text: `Thank you, ${donorName}. Donation ID: ${donationId}. Receipt: ${receiptNumber}. Amount: ${amountFormatted}. Purpose: ${purpose}. Date: ${dateFormatted}.`,
  };
}

function escapeHtml(input: string) {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
