// import { NextResponse } from 'next/server'
// import type { NextRequest } from 'next/server'

import NextAuth from "next-auth"
import { authConfig } from "./lib/auth.config"

// export function middleware(request: NextRequest) {
//     return NextResponse.next()
// }

export default NextAuth(authConfig).auth;


export const config = {
    matcher: ["/((?!api|static|.*\\..*|_next).*)"],
}