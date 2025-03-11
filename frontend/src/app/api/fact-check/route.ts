import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const query = url.searchParams.get('query');
  
  try {
    const response = await fetch(`http://localhost:5050/fact-check?query=${query}`);
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'API 請求失敗' }, { status: 500 });
  }
}
