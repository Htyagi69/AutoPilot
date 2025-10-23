import {betterAuth}  from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "@/lib/db";

export const auth=betterAuth({
    database:prismaAdapter(prisma,{
        provider:"postgresql",
    }),
    emailAndPassword:{
        enabled:true,
        autoSignIn:true,//this helps us to not login again when signup
    },
      trustedOrigins: [
    "http://localhost:3000",
    "http://localhost:3001", // ✅ Add this to allow requests from your frontend
  ],

});