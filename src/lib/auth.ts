import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google";
import { connectToDB } from "./utils"
import { User } from "./models"
import bcrypt from "bcryptjs"
import { authConfig } from "./auth.config"

export const { handlers, signIn, signOut, auth } = NextAuth({
    ...authConfig,
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID ?? (() => { throw new Error("GITHUB_ID is not defined") })(),
            clientSecret: process.env.GITHUB_SECRET ?? (() => { throw new Error("GITHUB_SECRET is not defined") })(),
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code"
                }
            }
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                // Validate credentials exist
                if (!credentials?.username || !credentials?.password) {
                    throw new Error("Username and password are required");
                }

                await connectToDB();

                const user = await User.findOne({ username: credentials?.username });

                if (!user) {
                    throw new Error("No user found with the given username");
                }

                // Type-cast credentials.password to string
                const isPasswordValid = await bcrypt.compare(
                    credentials.password as string,
                    user.password
                );

                if (!isPasswordValid) {
                    throw new Error("Invalid password");
                }

                return { id: user._id.toString(), name: user.username, email: user.email, isAdmin: user.isAdmin ?? false };
            }
        })
    ],
    callbacks: {
        async signIn({ user, account, profile }) {
            // console.log(user, account, profile)
            if (account?.provider === 'github' || account?.provider === 'google') {
                await connectToDB();
                try {
                    const dbUser = await User.findOne({ email: profile?.email });
                    if (!dbUser) {
                        const newUser = await User.create({
                            username: profile?.login,
                            email: profile?.email,
                            img: profile?.avatar_url
                        });

                        await newUser.save();
                        console.log("New user created:", newUser);
                    }
                }
                catch (error) {
                    console.log("Error connecting to DB:", error)
                    return false;
                }
            }

            return true;
        },
        ...authConfig.callbacks
    }
})