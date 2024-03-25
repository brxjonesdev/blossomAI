import {NextRequest, NextResponse} from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function GET(req: NextRequest) {
  return NextResponse.json({message: 'Hello, world!'});
}

export async function POST(req: NextRequest) {
  const supabase = createClient();
  const body = await req.json();
  if (!body) {
    return NextResponse.json({ error: 'Missing body' }, { status: 400 });
  }

  if (!body.type) {
    return NextResponse.json({ error: 'Missing body type' }, { status: 400 });
  }

  // check if user is in the database
  const { data, error } = await supabase
    .from('users')
    .select('githubusername')
    .eq('githubusername', body.username);

  // if user is not in the database, add them
  if (!data) {
    await supabase.from('users').insert({ githubusername: body.username });
  }

  // if user is in the database, now check if the user has a repository that matches the request
  const { data: repoData, error: repoError } = await supabase
    .from('connectedrepositories')
    .select('respositoryname')
    .eq('respositoryname', body.repo);

    // if the repository is not in the database, add it
  if (!repoData) {
    await supabase.from('connectedrepositories').insert({ respositoryname: body.repo });
  }

  switch (body.type) {
    case 'issue':
      console.log('Received issue body:', body.issueDetails);
      // Process the issue body here
    return NextResponse.json({ message: 'Received issue body' });
    case 'pull_request':
      console.log('Received pull request body:', body.pullRequestDetails);
      // Process the pull request body here
      return NextResponse.json({ message: 'Received pull request body' });
    case 'push':
      console.log('Received commit body:', body.commitDetails);
      supabase.from('commits').insert(body.commitDetails);
      return NextResponse.json({ message: 'Received commit body' });
    default:
      console.log('Invalid body type received:', body.type);
  }
  return NextResponse.json({message: 'Hello, world!', body: body}, { status: 200 });
}
