import NextAuth from "next-auth";
import SlackProvider from "next-auth/providers/slack";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Slackからのプロフィールレスポンス用のカスタム型
interface Profile {
  sub: string;
  name: string;
  email: string;
  picture: string;
}

export default NextAuth({
  providers: [
    SlackProvider({
      clientId: <string>process.env.SLACK_CLIENT_ID,
      clientSecret: <string>process.env.SLACK_CLIENT_SECRET,
      authorization: {
        params: {
          scope: "openid profile email",
        },
      },
    }),
  ],
  adapter: PrismaAdapter(prisma),
  callbacks: {
    async signIn({ user, account, profile }) {
      console.log(profile, account)
      if (account?.provider === "slack") {
        const { sub: id, name, email, picture: icon } = profile as Profile; // カスタム型を使用して型アサーション

        // ユーザー情報を更新（Prismaのクエリは実際のスキーマに合わせてください）
        await prisma.user.upsert({
          where: { email: email },
          update: {
            name: name,
            slackId: id,
            icon: icon,
          },
          create: {
            email: email,
            name: name,
            slackId: id,
            icon: icon,
          },
        });
      }
      return true; // サインインを許可
    },
    async session({ session, token }) {
      // tokenからemailを取得
      const userEmail = token.email;

      // userEmailを使用してデータベースからユーザー情報を取得
      if (userEmail) {
        const user = await prisma.user.findUnique({
          where: { email: userEmail },
        });
        if (user) {
          // カスタムユーザー情報を含む新しいフィールドをセッションオブジェクトに追加
          const customUser: any = session.user;
          customUser.id = user.id.toString(); // IDを文字列に変換
          customUser.icon = user.icon ?? ""; 
        }
      }

      return session;
    },
  },
});
