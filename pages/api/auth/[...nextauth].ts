import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth, { User } from "next-auth";
import SlackProvider from "next-auth/providers/slack";
import prisma from "@/lib/prisma";

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
    async session({ session, user }: { session: any, user: User }) {
      if (user?.id) {
        session.user.id = user.id;
      }
      return session;
    },  
  },
  debug: true, // デバッグ情報を有効にする
};

export default NextAuth(authOptions);
