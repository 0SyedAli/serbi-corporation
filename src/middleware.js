import { NextResponse } from 'next/server';

// Specify the paths where the middleware should run
export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - images (public images)
         */
        '/((?!api|_next/static|_next/image|favicon.ico|images).*)',
    ],
};

export function middleware(request) {
    const { pathname } = request.nextUrl;

    const adminSession = request.cookies.get('admin_session')?.value;

    // Protect admin routes
    if (pathname.startsWith('/admin/dashboard')) {
        if (!adminSession) {
            // Redirect unauthenticated users to login
            const loginUrl = new URL('/auth/login', request.url);
            return NextResponse.redirect(loginUrl);
        }
        // Allow authenticated users to proceed to dashboard
        return NextResponse.next();
    }

    // Prevent authenticated users from visiting auth pages (like /auth/login, /auth/signup)
    if (pathname.startsWith('/auth') && adminSession) {
        // Already logged in, redirect to dashboard
        const dashboardUrl = new URL('/admin/dashboard/users', request.url);
        return NextResponse.redirect(dashboardUrl);
    }

    // Explicitly allow public pages like '/' to pass through without redirects
    // This will also catch any other public pages not caught above
    return NextResponse.next();
}
