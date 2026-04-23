import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag, revalidatePath } from 'next/cache';

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    const secret = process.env.AGIX_WP_WEBHOOK_SECRET;

    if (!secret) {
      return NextResponse.json(
        { message: 'Webhook secret not configured on server.' },
        { status: 500 }
      );
    }

    if (authHeader !== `Bearer ${secret}` && authHeader !== secret && request.nextUrl.searchParams.get('secret') !== secret) {
      return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
    }

    // Revalidate the WordPress posts cache tag
    // @ts-expect-error - Next.js 15+ type definitions might require a 2nd argument
    revalidateTag('wordpress-posts');
    
    // Specifically revalidate the insights list page
    revalidatePath('/insights');

    // Optionally extract the post slug from the webhook payload if needed
    // const body = await request.json();
    // if (body?.post?.post_name) {
    //   revalidatePath(`/insights/${body.post.post_name}`);
    // }

    return NextResponse.json({ revalidated: true, now: Date.now() });
  } catch (err) {
    return NextResponse.json({ message: 'Error revalidating' }, { status: 500 });
  }
}
