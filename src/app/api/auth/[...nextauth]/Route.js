import { dbConnect } from "@/lib/dbConnect";
import bcrypt from "bcrypt";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { use } from "react";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      async authorize(credentials, req) {
        console.log(credentials);
        const userCollection = await dbConnect("users");
        const user = await userCollection.findOne({
          email: credentials.email,
        });

        if (!user) {
          return null;
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isPasswordValid) {
          return null;
        }
        return user;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (account.provider === "google") {
        const userCollection = await dbConnect("users");

        const existingUser = await userCollection.findOne({
          email: user.email,
        });

        if (!existingUser) {
          const newUser = {
            provider: account?.provider,
            name: user.name,
            email: user.email,
            image: user.image,
            role: "user",
          };
          const result = await userCollection.insertOne(newUser);
          return true;
        }
      }
    },
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
    async session({ session, user, token }) {
      if (token?.role) {
        session.user.role = token.role;
      }
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      if (user?.role) {
        token.role = user.role;
      }
      return token;
    },
  },
};

const handle = NextAuth(authOptions);
export { handle as GET, handle as POST };
