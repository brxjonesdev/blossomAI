import { NextRequest, NextResponse } from 'next/server';
import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';

type EventData = {
  type?: string;
  timestamp?: string;
  blsmRepoID?: number;
  username?: string;
  commitMessage?: string;
  issueAction?: string;
  issueNumber?: string;
  issueTitle?: string;
  issueBody?: string;
  pullRequestAction?: string;
  pullRequestNumber?: string;
  pullRequestTitle?: string;
  pullRequestBody?: string;
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
  const body: EventData = await req.json();

  switch (body.type) {
    case 'push':
      console.log('Handling commit event...');
      await supabase.from('Updates').insert([
        {
          type: body.type,
          created_at: body.timestamp,
          parent_repo: body.blsmRepoID,
          message: body.commitMessage,
        },
      ]);
      break;
    case 'issue':
      console.log('Handling issue event...');
      await supabase.from('Updates').insert([
        {
          type: body.type,
          created_at: body.timestamp,
          parent_repo: body.blsmRepoID,
          action: body.issueAction,
          title: body.issueTitle,
          body: body.issueBody,
          number: body.issueNumber,
        },
      ]);
      break;
    case 'pullRequest':
      console.log('Handling pull request event...');

      const { data, error } = await supabase.from('Updates').insert([
        {
          type: body.type,
          created_at: body.timestamp,
          parent_repo: body.blsmRepoID,
          action: body.pullRequestAction,
          title: body.pullRequestTitle,
          body: body.pullRequestBody,
          number: body.pullRequestNumber,
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
