import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
    const sessionId = request.cookies.get('sessionid')
    // console.log("🚀 ~ middleware ~ sessionId:", sessionId)

    const response = NextResponse.next();
    
}

export const config = {
    matcher: '/:path*',
    // regions: ['iad1', 'sfo1'], // Specify the regions
    // runtime: 'edge', // Specify the runtime environment
}
