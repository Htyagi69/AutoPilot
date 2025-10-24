import {checkout,polar,portal} from "@polar-sh/better-auth"
import {betterAuth}  from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "@/lib/db";
import { polarClient } from "./polar";

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
  plugins:[
    polar({
      client:polarClient,
      createCustomerOnSignUp:true,
      use:[
        checkout({
          products:[
            {
              productId:"9f49be00-c77f-434f-a5c4-5fe131e8cc2c",
              slug:"pro",
            }
          ],
          successUrl:process.env.POLAR_SUCCESS_URL,
          authenticatedUsersOnly:true,
        }),
        portal()
      ]
    })
  ]
});