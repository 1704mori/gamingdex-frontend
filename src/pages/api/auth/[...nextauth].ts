import { authService } from "@/lib/services/auth";
import { API_URL } from "@/settings";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const payload = {
          email: credentials?.email,
          password: credentials?.password,
        };

        try {
          const { data } = await authService.login(
            payload?.email as string,
            payload?.password as string
          );

          console.log('data', data);

          return {
            ...(data as any),
          };
        } catch (error: any) {
          throw {
            message: error.code,
          }
        }
      },
    }),
  ],
  secret: process.env.JWT_SECRET,
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt(data) {
      console.log("jwt data", data);

      if (data.account && data.user) {
        return {
          ...data.token,
          accessToken: (data.user as any).accessToken,
        };
      }

      return data.token;
    },
    async session({ session, token, user }) {
      (session as any).accessToken = token.accessToken;

      return session;
    },
    redirect({ url, baseUrl }) {
      return baseUrl;
    }
  },
  debug: true,
};

export default NextAuth(authOptions);
