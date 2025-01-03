import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/login`, {
            email: credentials.email,
            password: credentials.password
          });

          if (response.data.success) {
            const user = {
              id: response.data.data.id,
              email: response.data.data.email,
              nama: response.data.data.nama,
              token_1: response.data.data.token_1,
              token_2: response.data.data.token_2
            };
            return user;
          } else {
            return null;
          }
        } catch (error) {
          console.error("Login error", error);
          return null;
        }
      }
    })
  ],
  pages: {
    signIn: '/login', // Ganti dengan halaman login sesuai kebutuhan
    error: '/error' // Halaman error bila login gagal
  },
  session: {
    jwt: true,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.nama = user.nama;
        token.token_1 = user.token_1;
        token.token_2 = user.token_2;
      }
      return token;
    },
    async session({ session, token }) {
      session.id = token.id;
      session.email = token.email;
      session.nama = token.nama;
      session.token_1 = token.token_1;
      session.token_2 = token.token_2;
      return session;
    }
  },
  secret: process.env.NEXTAUTH_SECRET, // Set this in your .env file
};

export default NextAuth(authOptions);
