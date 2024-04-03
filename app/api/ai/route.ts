import { NextResponse, NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  return NextResponse.json({ message: 'Hello, world!' });
}
export async function POST(req: NextRequest) {
  const body = await req.json();
  {
    /*
        What we are doing here: 
        1. We are getting the request body. This has the updates and contentType.
        2. We need to send this to the AI model to generate the content.
        3. We will get the generated content from the AI model.
        4. We need to delete the updates from the database.
        5. We need to save the generated content in the database.
        6. We need to return the generated content to the client.
    */
  }
  return NextResponse.json({ message: 'Hello, world!', status: 200, body });
}
