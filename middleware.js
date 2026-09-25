import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Block internal development routes in production environments
  if (pathname.startsWith('/dev') && process.env.NODE_ENV === 'production') {
    return new NextResponse(null, { status: 404 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dev/:path*'],
};
