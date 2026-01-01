import { dbConnect } from "@/lib/dbConnect";
import bcrypt from "bcrypt";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  session: {
    strategy: "jwt",
  },

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        const userCollection = await dbConnect("users");

        const user = await userCollection.findOne({
          email: credentials.email,
        });

        if (!user) return null;

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isPasswordValid) return null;

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role,
        };
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  callbacks: {
    async signIn({ user, account }) {
      if (account.provider === "google") {
        const userCollection = await dbConnect("users");

        const existingUser = await userCollection.findOne({
          email: user.email,
        });

        if (!existingUser) {
          await userCollection.insertOne({
            provider: "google",
            name: user.name,
            email: user.email,
            image: user.image,
            role: "user",
            nidNumber: "Not Provided",
            contact: "Not Provided",
          });

          user.role = "user";
        } else {
          user.role = existingUser.role;
        }
      }
      return true;
    },

    async jwt({ token, user }) {
      if (user?.role) {
        token.role = user.role;
      }
      return token;
    },

    async session({ session, token }) {
      session.user.role = token.role;
      return session;
    },
  },
};

const handle = NextAuth(authOptions);
export { handle as GET, handle as POST };
