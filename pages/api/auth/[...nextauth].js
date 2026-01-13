import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  site: process.env.NEXTAUTH_URL,
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: {
          label: "Email",
          type: "text",
          placeholder: "johndoe@test.com",
        },
        password: { label: "Password", type: "password" },
      },
      authorize: (credentials) => {
        return {
          id: 2,
          name: "John",
          email: "johndoe@test.com",
          token: credentials.userToken,
        };
      },
    }),
  ],
  callbacks: {
    jwt: ({ token, user }) => {
      // first time jwt callback is run, user object is available
      if (user) {
        token.id = user.id;
        token.token = user.token;
      }

      return token;
    },
    session: ({ session, token }) => {
      if (token) {
        session.id = token.id;
        session.token = token.token;
      }
      return session;
    },
  },
  secret: "test",
  session: {
    maxAge: 30 * 24 * 60 * 60 * 60, // 30 days
  },
  jwt: {
    secret: "test",
    encryption: true,
  },
  pages: {
    signIn: "auth/sigin",
  },
});
