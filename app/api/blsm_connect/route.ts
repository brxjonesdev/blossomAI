import { NextResponse } from "next/server";

export async function POST(req: Request) {
  // const body = await req.json();
  // console.log('Received data:', body);
  const dummyData = {
    message: 'error clear',
    author: 'Braxton',
    sha: '3370567910cd24f4fec69abdf42444cd9bd47a69',
    ref: 'refs/heads/dev',
    repo: 'Braxton-Jones/blossomAI'
  }
  return NextResponse.next();
}