import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        if (!credentials) return null
        const { username, password } = credentials

        // Demo authorize: accept any non-empty username/password
        if (username && password) {
          return { id: username, name: username, email: `${username}@example.com` }
        }

        return null
      },
    }),
  ],
  session: { strategy: 'jwt' },
  secret: process.env.NEXTAUTH_SECRET || 'insecure-secret',
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.user = user
      return token
    },
    async session({ session, token }) {
      if (token?.user) session.user = token.user
      return session
    },
  },
}

export default authOptions
