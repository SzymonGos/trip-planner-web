import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { WebhookEvent } from '@clerk/nextjs/server';
import { CLERK_WEBHOOK_SECRET } from '@/lib/config';
import { createUser } from '@/features/user/server/actions/createUser';

export async function POST(req: Request) {
  const wh = new Webhook(CLERK_WEBHOOK_SECRET);

  const headerPayload = await headers();
  const svix_id = headerPayload.get('svix-id');
  const svix_timestamp = headerPayload.get('svix-timestamp');
  const svix_signature = headerPayload.get('svix-signature');

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error occurred -- no svix headers', {
      status: 400,
    });
  }

  const payload = await req.json();
  const body = JSON.stringify(payload);

  let evt: WebhookEvent;

  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new Response('Error occurred', {
      status: 400,
    });
  }

  const eventType = evt.type;

  if (eventType === 'user.created') {
    try {
      await createUser({
        clerkId: evt.data.id,
        username: evt.data.username,
        email: evt.data.email_addresses[0].email_address,
      });
    } catch (error) {
      console.error('Failed to sync Clerk user:', error);
      return new Response('Failed to sync user', { status: 500 });
    }
  }

  return new Response('', { status: 200 });
}
