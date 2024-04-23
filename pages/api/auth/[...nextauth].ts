import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import NextAuth from "next-auth";
import SlackProvider from "next-auth/providers/slack";

const prisma = new PrismaClient();
const adapter = PrismaAdapter(prisma);

adapter.linkAccount = async ({
  provider,
  type,
  providerAccountId,
  access_token,
  token_type,
  id_token,
  userId,
}) => {
  await prisma.account.create({
    data: {
      provider,
      type,
      providerAccountId,
      access_token,
      token_type,
      id_token,
      userId,
    },
  });
  return;
};

export const authOptions = {
  adapter: adapter,
  providers: [
    SlackProvider({
      clientId: <string>process.env.SLACK_CLIENT_ID,
      clientSecret: <string>process.env.SLACK_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      if (user?.id) {
        session.user.id = user.id;
      }
      return session;
    },  
  }
};

export default NextAuth(authOptions);
