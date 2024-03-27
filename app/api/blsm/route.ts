import {NextRequest, NextResponse} from 'next/server';
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function GET(req: NextRequest) {
  return NextResponse.json({message: 'Hello, world!'});
}

export async function POST(req: NextRequest) {
  const cookieStore = cookies()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          cookieStore.set({ name, value, ...options })
        },
        remove(name: string, options: CookieOptions) {
          cookieStore.set({ name, value: '', ...options })
        },
      },
    }
  )
  const body = await req.json();

  if (!body || body === undefined || body === null) {
    return NextResponse.json({ error: 'Missing body' }, { status: 400 });
  }
  if (!body.activityInfo.type) {
    return NextResponse.json({ error: 'Missing body type' }, { status: 400 });
  }

  const { data: user, error } = await supabase
    .from('users')
    .select('*')
    .eq('github_username', body.activityInfo.username)
    .maybeSingle();
  if (error) {
    return NextResponse.json({ "Pre": error.message }, { status: 500 });
  }
  if (!user) {
    const { data: newUser, error: newError } = await supabase
      .from('users')
      .insert([
        {
          githubusername: body.activityInfo.username,
        },
      ])
      .single();
    if (newError) {
      return NextResponse.json({ error: newError.message }, { status: 500 });
    }
  }
  // Check if the repo the user is sending the request for is in the database, if not, add it. If it is, proceed.  
  switch (body.activityInfo.type) {
    case 'issue':
      console.log('Received issue body:', body.issueDetails);
      // Process the issue body here




    return NextResponse.json({ message: 'Received issue body & was succesfully sent to BLSM Database <3 <3 <3'});
    case 'pull_request':
      console.log('Received pull request body:', body.pullRequestDetails);
      // Process the pull request body here



      return NextResponse.json({ message: 'Received pull request body & was succesfully sent to BLSM Database <3 <3 <3'});
    case 'push':
      console.log('Received commit body:', body.commitDetails);
      // Process the commit body here



      return NextResponse.json({ message: 'Received commit body & was succesfully sent to BLSM Database <3 <3 <3', data: body.commitDetails});
    default:
      console.log('Invalid body type received:', body.type);
  }
  return NextResponse.json({message: 'Hello, world!', body: body}, { status: 200 });
}
