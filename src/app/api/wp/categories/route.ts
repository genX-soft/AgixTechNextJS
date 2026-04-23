import { NextRequest, NextResponse } from 'next/server';

const WP_API_BASE = "https://cms.agixtech.com/wp-json/wp/v2";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const params = url.searchParams.toString();

  try {
    const response = await fetch(`${WP_API_BASE}/categories?${params}`, {
      headers: { 'Accept': 'application/json' },
      next: { tags: ['wordpress-categories'] },
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
        'Cache-Control': 'public, max-age=0, s-maxage=31536000, stale-while-revalidate',
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to reach WordPress API' },
      { status: 502 }
    );
  }
}
