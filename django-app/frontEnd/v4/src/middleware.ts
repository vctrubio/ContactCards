import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
    const sessionId = request.cookies.get('sessionid')
    // If the user is already logged in, continue to the requested page

    if (!sessionId && request.nextUrl.pathname !== '/') {
        return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        // Apply middleware to all pages except those starting with /_next (Next.js static assets) and /public
        '/((?!_next/static|_next/image|favicon.ico|public/).*)',
    ],
    // matcher: ['/', '/home', '/dashboard'], // Apply middleware to specific pages

    // regions: ['iad1', 'sfo1'], // Specify the regions
    // runtime: 'edge', // Specify the runtime environment
}


/* EXAMPLE: CHECKING ID AND REDIRS ON CONDITION
export function middleware(request: NextRequest) {
    const sessionId = request.cookies.get('sessionid')
    // If the user is already logged in, continue to the requested page
    if (sessionId) {
        return NextResponse.next();
    }

    // Prevent redirect loop by skipping the login page
    if (request.nextUrl.pathname === '/login') {
        return NextResponse.next(); // Allow access to login page
    }

    // If not logged in, redirect to the login page
    return NextResponse.redirect(new URL('/login', request.url));
}




*/