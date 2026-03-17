import { NextRequest, NextResponse } from 'next/server';

const WP_API_BASE = "https://cms.agixtech.com/wp-json/wp/v2";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const params = url.searchParams.toString();

  try {
    const response = await fetch(`${WP_API_BASE}/posts?${params}`, {
      headers: { 'Accept': 'application/json' },
      next: { revalidate: 1800 },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `WordPress API error: ${response.status}` },
        { status: response.status }
      );
    }

    const data = await response.json();

    return NextResponse.json(data, {
      headers: {
        'X-WP-Total': response.headers.get('X-WP-Total') || '0',
        'X-WP-TotalPages': response.headers.get('X-WP-TotalPages') || '1',
        'Cache-Control': 'public, max-age=1800, stale-while-revalidate=3600',
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to reach WordPress API' },
      { status: 502 }
    );
  }
}
