import {NextRequest, NextResponse} from 'next/server';

export async function GET(req: NextRequest) {
  return NextResponse.json({message: 'Hello, world!'});
}

export async function POST(req: NextRequest) {
  return NextResponse.json({message: req.body});
}