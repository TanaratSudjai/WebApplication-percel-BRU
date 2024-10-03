import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { PrismaAdapter } from "@auth/prisma-adapter";

const prisma = new PrismaClient();

const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Staff",
      id: "staff-login",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "john@doe.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials) return null;
        const user = await prisma.staff.findUnique({
          where: { email: credentials.email },
        });

        if (
          user &&
          (await bcrypt.compare(credentials.password, user.password))
        ) {
          return {
            id: user.id,
            name: user.staff_name,
            email: user.email,
          };
        } else {
          throw new Error("Invalid email or password");
        }
      },
    }),

    CredentialsProvider({
      name: "Owner",
      id: "owner-login",
      credentials: {
        phone: { label: "Phone", type: "tel", placeholder: "+1234567890" },
      },
      async authorize(credentials, req) {
        if (!credentials) return null;
        const owner = await prisma.owner.findFirst({
          where: { own_phone: credentials.phone },
        });

        if (owner) {
          return {
            id: owner.own_id,
            name: owner.own_name,
            phone: owner.own_phone,
          };
        } else {
          throw new Error("Invalid phone number");
        }
      },
    }),
  ],

  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60,
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.phone = user.phone;
        token.userRole = user.email ? "staff" : "owner";
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (session.user) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.phone = token.phone;
        session.user.role = token.userRole;
      }
      return session;
    },
    redirect: async ({ url, baseUrl, user }) => {
      if (user?.role === "staff") {
        return `${baseUrl}/welcome`;
      } else if (user?.role === "owner") {
        return `${baseUrl}/helloowner`;
      } else {
        return `${baseUrl}/`;
      }
    },
  },
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
  },
  debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
