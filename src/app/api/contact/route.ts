import { NextResponse } from 'next/server';
import { contactSchema, REQUEST_TYPE_LABELS } from '@/lib/contact-schema';

// Simple in-memory rate limit: 5 requests / 10 min / IP.
// (Per server instance. On serverless or several instances use a shared store such as Upstash.)
const WINDOW_MS = 10 * 60 * 1000;
const MAX_HITS = 5;
const hits = new Map<string, number[]>();

function isLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_HITS;
}

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request.' }, { status: 400 });
  }

  // Honeypot: pretend everything worked so bots learn nothing
  if (typeof body === 'object' && body !== null && (body as { website?: string }).website) {
    return NextResponse.json({ ok: true });
  }

  const ip = req.headers.get('x-forwarded-for')?.split(',')[0].trim() ?? 'unknown';
  if (isLimited(ip)) {
    return NextResponse.json({ ok: false, error: 'Too many requests. Please try again later.' }, { status: 429 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: 'Please check the form and try again.' }, { status: 400 });
  }
  const d = parsed.data;

  const text = [
    `Request type: ${REQUEST_TYPE_LABELS[d.type]}`,
    `Name: ${d.name}`,
    `Company: ${d.company || '-'}`,
    `Email: ${d.email || '-'}`,
    `Phone: ${d.phone || '-'}`,
    `Country / destination: ${d.country || '-'}`,
    '',
    d.message || '(no details)',
  ].join('\n');

  const key = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;

  if (!key || !to || !from) {
    if (process.env.NODE_ENV !== 'production') {
      console.log('[contact] email not configured, request received:\n' + text);
      return NextResponse.json({ ok: true });
    }
    return NextResponse.json({ ok: false, error: 'The service is not available right now.' }, { status: 500 });
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: d.email || undefined,
      subject: `[NFP] ${REQUEST_TYPE_LABELS[d.type]} - ${d.name}`,
      text,
    }),
  });

  if (!res.ok) {
    return NextResponse.json({ ok: false, error: 'We could not send your request. Please try again.' }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
