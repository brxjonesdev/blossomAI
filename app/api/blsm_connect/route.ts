import {NextRequest, NextResponse} from 'next/server';

export async function GET(req: NextRequest) {
  return NextResponse.json({message: 'Hello, world!'});
}
export async function POST(req: NextRequest) {
  const body = await req.json();
  if (!body) {
    return NextResponse.json({ error: 'Missing body' }, { status: 400 });
  }

  if (!body.type) {
    return NextResponse.json({ error: 'Missing body type' }, { status: 400 });
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
    //   send body to the bodybase
      return NextResponse.json({ message: 'Received commit body' });
    default:
      console.log('Invalid body type received:', body.type);
  }
  return NextResponse.json({message: 'Hello, world!', body: body}, { status: 200 });
}
