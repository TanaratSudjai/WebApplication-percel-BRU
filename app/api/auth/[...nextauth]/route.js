import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
// import bcrypt from "bcrypt";
import { PrismaAdapter } from "@auth/prisma-adapter";

const prisma = new PrismaClient();

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        staff_name: { label: "Username", type: "text", placeholder: "test" },
        phone: { label: "Phone", type: "phone" },
      },
      async authorize(credentials, req) {

        if (!credentials) return null;
        const user = await prisma.user.findUnique({
          where: { staff_name: credentials.staff_name },
        });
        return {
          id: user.staff_id,
          staff_name: user.staff_name,
        };
      },
    }),
  ],
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.staff_name = user.staff_name;
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (session.user) {
        session.user.id = token.id;
        session.user.staff_name = token.staff_name;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
