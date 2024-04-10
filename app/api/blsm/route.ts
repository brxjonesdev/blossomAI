import { NextRequest, NextResponse } from 'next/server';
import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';

type Event = {
  type: string;
  timestamp: string;
  repoID: string;
  username: string;
  commitDetails: {
    timestamp: string;
    message: string;
    repo: string;
  };
  pullRequestDetails: {
    action: '';
    timestamp: string;
    number: '';
    title: '';
    body: '';
  };
  issueDetails: {
    action: '';
    timestamp: string;
    number: '';
    title: '';
    body: '';
  };
};


export async function GET(req: NextRequest) {
  return NextResponse.json({ message: 'Hello, world!' });
}

export async function POST(req: NextRequest) {
  const cookieStore = cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          cookieStore.set({ name, value, ...options });
        },
        remove(name: string, options: CookieOptions) {
          cookieStore.set({ name, value: '', ...options });
        },
      },
    }
  );
  const body: Event = await req.json();

  switch (body.type) {
    case 'push':
      console.log('Handling commit event...');
      await supabase.from('Updates').insert([
        {
          type: body.type,
          created_at: body.timestamp,
          parent_repo: body.repoID,
          message: body.commitDetails.message,
          sender: body.username,
        },
      ]);
      break;
    case 'issue':
      console.log('Handling issue event...');
      await supabase.from('Updates').insert([
        {
          type: body.type,
          created_at: body.timestamp,
          parent_repo: body.repoID,
          action: body.issueDetails.action,
          title: body.issueDetails.title,
          body: body.issueDetails.body,
          number: body.issueDetails.number,
          sender: body.username,
        },
      ]);
      break;
    case 'pull_request':
      console.log('Handling pull request event...');

      const { data, error } = await supabase.from('Updates').insert([
        {
          type: body.type,
          created_at: body.timestamp,
          parent_repo: body.repoID,
          action: body.pullRequestDetails.action,
          title: body.pullRequestDetails.title,
          body: body.pullRequestDetails.body,
          number: body.pullRequestDetails.number,
          sender: body.username,
        },
      ]);
      if (error) {
        console.log('Error inserting pull request event:', error.message);
      }
      break;
    default:
      console.log('Unknown event type');
      break;
  }

  return NextResponse.json({
    message: 'Event proccesed',
    body: body,
    status: 200,
  });
}
