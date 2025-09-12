import { type NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'password',
      credentials: {
        password: {
          label: 'Password',
          type: 'password'
        }
      },
      async authorize(credentials) {
        if (credentials?.password == process.env.BASIC_AUTH_PASSWORD) {
          return { id: '0' };
        } else {
          return null;
        }
      }
    })
  ],
  callbacks: {
    async redirect({ url }) {
      return url;
    }
  },
  session: {
    strategy: 'jwt'
  },
  secret: 'fridayalbum'
};
