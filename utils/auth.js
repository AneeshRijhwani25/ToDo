import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from './connect'
import { NextResponse } from "next/server"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from 'next-auth/providers/google'
import { getServerSession } from "next-auth"
import bcrypt from 'bcryptjs';
export const authOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "username" },
        email: {
          label: "Email",
          type: "email",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // try {
          if (!credentials.email || !credentials.password) {
            throw new Error("Invalid credentials");
          }
      
          const user = await prisma.user.findUnique({
            where: {
              email: credentials.email
            }
          });
      
          if (!user) {
            throw new Error("No user exist");
          }
      
          const checkPassword = await bcrypt.compare(credentials.password, user.password);
          if (!checkPassword) {
            throw new Error("Wrong Password");;
          }
      
          return user;
        // } catch (error) {
        //   return new NextResponse(JSON.stringify({
        //     message: error.message || "Internal Server Error"
        //   }, {
        //     status: error.status || 500
        //   }));
        // }
      }
      
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    })
  ],
  // callbacks: {
  //   session: ({ session, token }) => {
  //     return {
  //       ...session,
  //       user: {
  //         ...session.user,
  //         id: token.id,
  //         randomKey: token.randomKey,
  //       },
  //     };
  //   },
  //     jwt: ({ token, user }) => {
  //       if (user) {
  //         const u = user;
  //         return {
  //           ...token,
  //           id: u.id,
  //           randomKey: u.randomKey,
  //         };
  //       }
  //       return token;
  //     },
  //   },
}

export const getAuthSession = () => getServerSession(authOptions)
