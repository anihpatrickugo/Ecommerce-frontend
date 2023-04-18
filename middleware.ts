import { NextRequest,NextResponse } from "next/server";


export async function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname
    const token = request.cookies.get('authToken')?.value

    if (!token){
        const url  = new URL('/login', request.url)
        url.searchParams.set("callbackUrl", pathname)
        return NextResponse.redirect(url)
    }
    return NextResponse.next()
    
} 


export const config = {
    matcher: [
        '/profile',
        '/profile/edit',
        '/profile/orders',
        '/checkout', 
        '/shipping-address',
        '/payment-success',
        '/payment-failure',
    ],
};