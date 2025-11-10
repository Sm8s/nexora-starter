import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ items: [], message: 'tasks list (stub)' });
}
export async function POST(req: Request) {
  const body = await req.json();
  return NextResponse.json({ created: body, message: 'create task (stub)' }, { status: 201 });
}
