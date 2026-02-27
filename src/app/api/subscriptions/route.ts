'use server';

import { EmailTemplate } from '@components/email-template';
import { getSubscriptions } from '@lib/services/subscription.service';
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(): Promise<NextResponse> {
  try {
    const subscribers = await getSubscriptions();

    const subs = subscribers.map((sub: any) => ({
      from: 'Friday Album <hello@fridayalbum.com>',
      to: [sub.email],
      subject: "💿 It's Friday! A new album is waiting.",
      react: EmailTemplate({
        unsub_token: sub.unsub_token
      })
    }));

    const { data, error } = await resend.batch.send(subs);

    if (error || data.data.length === 0) {
      console.error(`Failed to send emails: ${error}`);
      throw error;
    }

    return NextResponse.json({
      message: `${data.data.length} notification(s) sent successfully`
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
