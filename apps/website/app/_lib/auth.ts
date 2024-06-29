import { getServerSession, NextAuthOptions } from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import GoogleProvider from 'next-auth/providers/google';
import { db } from '@repo/db/client';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  session: { strategy: 'jwt' },
  pages: {
    signIn: '/login',
  },
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
  ],
  callbacks: {
    async session({ token, session }) {
      if (token) {
        // @ts-ignore
        session.user.id = token.id;
        // @ts-ignore
        session.user.name = token.name;
        // @ts-ignore
        session.user.email = token.email;
        // @ts-ignore
        session.user.image = token.picture;
        //@ts-ignore
        session.user.guestId = token.guestId;
      }
      return session;
    },
    async jwt({ token, user }) {
      const dbUser = await db.user.findFirst({
        where: {
          email: token.email,
        },
      });

      if (!dbUser) {
        token.id = user!.id;
        return token;
      }

      let existingGuest = await db.guests.findUnique({
        where: {
          //@ts-ignore
          email: dbUser.email,
        },
      });

      if (!existingGuest) {
        existingGuest = await db.guests.create({
          data: {
            email: dbUser.email || '',
            fullName: dbUser.name || '',
          },
        });
      }

      console.log(existingGuest);

      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        picture: dbUser.image,
        guestId: existingGuest.id,
      };
    },
    redirect() {
      return '/account';
    },
  },
};

export const getAuthSession = () => getServerSession(authOptions);
