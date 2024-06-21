import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { PrismaAdapter } from "@auth/prisma-adapter";

const prisma = new PrismaClient();

const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        staff_name: { label: "Username", type: "text", placeholder: "Enter your username" },
        staff_phone: { label: "Phone Number", type: "text", placeholder: "Enter your phone number" }
      },
      async authorize(credentials) {
        if (!credentials) return null;
        
        const user = await prisma.staff.findUnique({
          where: { staff_name: credentials.staff_name },
        });

        if (!user) {
          throw new Error("No user found with this username");
        }

        const passwordMatch = await bcrypt.compare(credentials.password, user.password);

        if (!passwordMatch) {
          throw new Error("Incorrect password");
        }

        return {
          id: user.staff_id,
          staff_name: user.staff_name,
          staff_phone: user.staff_phone
        };
      },
    }),
  ],
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.staff_name = user.staff_name;
        token.staff_phone = user.staff_phone;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = token;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  debug: process.env.NODE_ENV === "development",
};

export default (req, res) => NextAuth(req, res, authOptions);
