import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { connectToDB } from '@utils/database';
import User from '@models/user';

console.log({
  clientId: process.env.GOOGLE_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET
});

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })
    // Add GitHub authentication also
    // use : https://next-auth.js.org/getting-started/example
    // Add Authorized redirect URIs on Google Cloud
  ],

  //  a) Without declaring callbacks session, signIn will not work, and if SignIN not work then
  callbacks: {
    //  b) We want to be able to get data about user every single time to keep an existing and running session so for that we do next 4-line code which return session containing all details about user
    async session({ session }) {
      const sessionUser = await User.findOne({ email: session.user.email });
      session.user.id = sessionUser._id.toString();

      return session;
    },

    async signIn({ profile }) {
      try {
        await connectToDB();

        // 1. check if a user already exists
        const userExits = await User.findOne({
          email: profile.email
        });

        // 2. if not, create a new user
        if (!userExits) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(' ', '').toLowerCase(),
            image: profile.picture
          });
        }

        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    }
  }
});

export { handler as GET, handler as POST };

// Every NextJS route is something known as a serverless route which means that this is a lambda function that opens up only when it get called, so every time it gets called it needs to spin up the server and make a connection to the database that is great because we don't have to keep our server running constantly but we do have to to actually make a connection to the database.
