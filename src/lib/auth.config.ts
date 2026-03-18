import type { NextAuthConfig } from "next-auth";

export const authConfig = {
    pages: {
        signIn: "/login"
    },
    providers: [],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.isAdmin = user.isAdmin ?? false;
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user.id = String(token.id);
                session.user.isAdmin = Boolean(token.isAdmin);
            }
            return session;
        },
        authorized: ({ auth, request }) => {
            const user = auth?.user;
            const isOnAdminPanel = request.nextUrl.pathname.startsWith("/admin");
            const isOnBlogPage = request.nextUrl.pathname.startsWith("/blog");
            const isOnLoginPage = request.nextUrl.pathname === "/login";

            // Only Admins can see the admin panel
            if (isOnAdminPanel) {
                return user?.isAdmin ?? false;
            }

            // Only authenticated users can see the blog panel
            if (isOnBlogPage) {
                return !!user;
            }

            // Allow access to the login page for unauthenticated users
            if (isOnLoginPage && !user) {
                return true;
            }

            // Redirect authenticated users away from the login page
            if (isOnLoginPage && user) {
                return Response.redirect(new URL("/", request.url));
            }

            // Handle API routes before the general user check
            if (request.nextUrl.pathname.startsWith("/api")) {
                if (!user) {
                    return new Response(JSON.stringify({ error: "Unauthorized" }), {
                        status: 401,
                        headers: { "Content-Type": "application/json" }
                    });
                }
                return true;
            }

            // Allow access to all other routes for authenticated users
            if (user) {
                return true;
            }

            return true;
        }
    }
} satisfies NextAuthConfig