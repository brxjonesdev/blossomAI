import { NextResponse } from "next/server";

export async function POST(req: Request) {
  // const body = await req.json();
  // console.log('Received data:', body);
  const dummyData = {
    timestamp: '2024-03-24T23:41:26-04:00',
    username: 'Braxton-Jones',
    message: 'small change',
    repo: 'Braxton-Jones/blossomAI'
  }
  return NextResponse.next();
}