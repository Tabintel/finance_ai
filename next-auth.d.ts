import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      isOnboarded: boolean;
    } & DefaultSession["user"]; // Merge with default user properties
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    isOnboarded: boolean;
  }
}
