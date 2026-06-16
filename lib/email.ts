import { Resend } from 'resend';

const resendApiKey = process.env.RESEND_API_KEY;
const fromEmail = process.env.RESEND_FROM_EMAIL || 'noreply@octanex31.com';
const adminEmail = process.env.ADMIN_EMAIL || 'salunkheshivam18@gmail.com';

let resend: Resend | null = null;

if (resendApiKey) {
  resend = new Resend(resendApiKey);
}

interface Lead {
  name: string;
  email: string;
  phone?: string | null;
  service_interest?: string | null;
  message?: string | null;
}

interface DemoBooking {
  name: string;
  business_name?: string | null;
  phone?: string | null;
  whatsapp_number?: string | null;
  email?: string | null;
  date?: string | null;
  time_slot?: string | null;
  service_interest?: string | null;
  message?: string | null;
}

interface Feedback {
  name: string;
  email: string;
  message: string;
}

function darkWrapper(title: string, body: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${title}</title></head>
<body style="margin:0;padding:0;background-color:#0a0a0a;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#e5e5e5">
<table width="100%" cellpadding="0" cellspacing="0" style="background-color:#0a0a0a;padding:40px 20px">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="background-color:#141414;border-radius:12px;border:1px solid #2a2a2a;overflow:hidden">
<tr><td style="padding:32px 40px;background:linear-gradient(135deg,#1a1a2e,#16213e);border-bottom:1px solid #2a2a2a">
<h1 style="margin:0;font-size:22px;color:#ffffff;font-weight:700">OctaNex31</h1>
<p style="margin:4px 0 0;font-size:13px;color:#888">${title}</p>
</td></tr>
<tr><td style="padding:32px 40px">${body}</td></tr>
<tr><td style="padding:20px 40px;border-top:1px solid #2a2a2a;text-align:center">
<p style="margin:0;font-size:12px;color:#555">&copy; ${new Date().getFullYear()} OctaNex31. All rights reserved.</p>
</td></tr>
</table>
</td></tr>
</table>
</body>
</html>`;
}

function fieldRow(label: string, value: string): string {
  return `<tr><td style="padding:8px 0;font-size:13px;color:#888;width:120px;vertical-align:top">${label}</td><td style="padding:8px 0;font-size:14px;color:#e5e5e5">${value}</td></tr>`;
}

function buildTable(rows: string): string {
  return `<table width="100%" cellpadding="0" cellspacing="0">${rows}</table>`;
}

export async function sendNewLeadNotification(lead: Lead): Promise<void> {
  if (!resend) {
    console.warn('Resend not initialized. Skipping email.');
    return;
  }
  try {
    const rows = [
      fieldRow('Name', lead.name),
      fieldRow('Email', lead.email),
      fieldRow('Phone', lead.phone || '—'),
      fieldRow('Service', lead.service_interest || '—'),
      fieldRow('Message', lead.message || '—'),
    ].join('');
    await resend.emails.send({
      from: fromEmail,
      to: adminEmail,
      subject: `New Lead: ${lead.name}`,
      html: darkWrapper(
        'New Lead Captured',
        `<h2 style="margin:0 0 20px;font-size:18px;color:#ffffff">A new lead has been captured</h2>${buildTable(rows)}`
      ),
    });
  } catch (error) {
    console.error('Failed to send lead notification email:', error);
  }
}

export async function sendNewDemoBookingNotification(booking: DemoBooking): Promise<void> {
  if (!resend) {
    console.warn('Resend not initialized. Skipping email.');
    return;
  }
  try {
    const rows = [
      fieldRow('Name', booking.name),
      fieldRow('Business', booking.business_name || '—'),
      fieldRow('Phone', booking.phone || '—'),
      fieldRow('WhatsApp', booking.whatsapp_number || '—'),
      fieldRow('Service', booking.service_interest || '—'),
      fieldRow('Time', booking.time_slot || '—'),
      fieldRow('Message', booking.message || '—'),
    ].join('');
    await resend.emails.send({
      from: fromEmail,
      to: adminEmail,
      subject: `New Demo Booking: ${booking.name}`,
      html: darkWrapper(
        'New Demo Booking',
        `<h2 style="margin:0 0 20px;font-size:18px;color:#ffffff">A new demo booking has been requested</h2>${buildTable(rows)}`
      ),
    });
  } catch (error) {
    console.error('Failed to send demo booking notification email:', error);
  }
}

export async function sendDemoBookingConfirmation(booking: DemoBooking): Promise<void> {
  if (!resend) {
    console.warn('Resend not initialized. Skipping email.');
    return;
  }
  try {
    const email = booking.email || adminEmail;
    const rows = [
      fieldRow('Name', booking.name),
      fieldRow('Business', booking.business_name || '—'),
      fieldRow('Phone', booking.phone || '—'),
      fieldRow('WhatsApp', booking.whatsapp_number || '—'),
      fieldRow('Service', booking.service_interest || '—'),
      fieldRow('Time', booking.time_slot || '—'),
      fieldRow('Message', booking.message || '—'),
    ].join('');
    await resend.emails.send({
      from: fromEmail,
      to: email,
      subject: 'Your Demo Booking Confirmation – OctaNex31',
      html: darkWrapper(
        'Booking Confirmed',
        `<h2 style="margin:0 0 20px;font-size:18px;color:#ffffff">Hi ${booking.name},</h2>
<p style="margin:0 0 20px;font-size:14px;color:#aaa;line-height:1.6">Your demo booking with OctaNex31 has been received. Our team will contact you within 24 hours to confirm your slot.</p>${buildTable(rows)}
<p style="margin:20px 0 0;font-size:14px;color:#aaa;line-height:1.6">We look forward to showing you what we can build together.</p>`
      ),
    });
  } catch (error) {
    console.error('Failed to send demo booking confirmation email:', error);
  }
}

export async function sendNewFeedbackNotification(feedback: Feedback): Promise<void> {
  if (!resend) {
    console.warn('Resend not initialized. Skipping email.');
    return;
  }
  try {
    const rows = [
      fieldRow('Name', feedback.name),
      fieldRow('Email', feedback.email),
      fieldRow('Message', feedback.message),
    ].join('');
    await resend.emails.send({
      from: fromEmail,
      to: adminEmail,
      subject: `New Feedback: ${feedback.name}`,
      html: darkWrapper(
        'New Feedback',
        `<h2 style="margin:0 0 20px;font-size:18px;color:#ffffff">New feedback received</h2>${buildTable(rows)}`
      ),
    });
  } catch (error) {
    console.error('Failed to send feedback notification email:', error);
  }
}
