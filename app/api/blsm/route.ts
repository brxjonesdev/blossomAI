import { NextRequest, NextResponse } from 'next/server';
import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';

type DataFromAction = {
  type: string;
  timestamp: string;
  repoID: number;
  username: string;
  repo: string;
  commitDetails: {
    message: string | null;
    timestamp: string | null;
    commitID: string | null;
    commitURL: string | null;
  };
  pullRequestDetails: {
    number: number | null;
    state: string | null;
    title: string | null;
    body: string | null;
  };
  issueDetails: {
    action: string | null;
    body: string | null;
    title: string | null;
    number: number | null;
    state: string | null;
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
  const body: DataFromAction = await req.json();

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
    case 'issues':
      console.log('Handling issue event...');
      await supabase.from('Updates').insert([
        {
          type: body.type,
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
      await supabase.from('Updates').insert([
        {
          type: body.type,
          parent_repo: body.repoID,
          action: body.pullRequestDetails.state,
          title: body.pullRequestDetails.title,
          body: body.pullRequestDetails.body,
          number: body.pullRequestDetails.number,
          sender: body.username,
        },
      ]);
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
