import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials"
import { connectMongo } from "@/utils/dbconnect";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export const authOptions = {
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            async authorize(credentials) {
                await connectMongo();
                try {
                    const user = await User.findOne({ email: credentials.email })
                    if (user) {
                        const isPasswordCorrect = await bcrypt.compare(
                            credentials.password,
                            user.password
                        );
                        if (isPasswordCorrect) {
                            return user;
                        } else {
                            throw new Error("Password is incorrect");
                        }
                    } else {
                        throw new Error("User not found");
                    }
                } catch (error) {
                    throw new Error(error);
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) token.role = user.role
            return token;
        },
        async session({ session, token }) {
            if (session?.user) session.user.role = token.role
            return session;
        },
    },
    pages: {
        signIn: "/login",
        signOut: "/register",
        error: "/login",
    }
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }