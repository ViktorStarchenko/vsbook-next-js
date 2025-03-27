import { NextResponse } from "next/server";

export function middleware(request) {

    const token = request.cookies.get("token")?.value;

    if (!token) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
}

// Застосовуємо middleware тільки до певних сторінок
export const config = {
    matcher: ["/account/:path*"] // Захищає всі підсторінки /account
};
