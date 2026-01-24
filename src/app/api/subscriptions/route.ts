'use server';

import { EmailTemplate } from '@components/email-template';
import { getSubscriptions } from '@lib/services/subscription.service';
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(): Promise<NextResponse> {
  try {
    let count = 0;
    const users = await getSubscriptions();

    for (const user of users) {
      try {
        const { data, error } = await resend.emails.send({
          from: 'Friday Album <hello@fridayalbum.com>',
          to: [user.email],
          subject: "💿 It's Friday. A new album is waiting.",
          react: EmailTemplate({
            unsub_token: user.unsub_token
          })
        });

        if (error) throw error;
        if (!error) count += 1;
      } catch (err: any) {
        console.error(`Failed to send email ${user.email}`);
      }
    }

    return NextResponse.json({
      message: `${count} notification(s) sent successfully`
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
