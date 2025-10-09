import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";

export default NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      // Use your real GitHub email for admin!
      session.isAdmin = session?.user?.email === "your_github_email@example.com";
      return session;
    }
  }
});
