import { createTRPCRouter } from '../init';
import { workflowsRouter } from '@/features/workflows/server/routers';

export const appRouter = createTRPCRouter({
 workflows:workflowsRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;






// import { promise } from 'zod';
// import { baseProcedure, createTRPCRouter, premiumProcedure, protectedProcedure } from '../init';
// import prisma from '@/lib/db';
// import { inngest } from '@/inngest/client';
// import { google } from '@ai-sdk/google';
// import  {generateText} from "ai"
// import { TRPCError } from '@trpc/server';

// export const appRouter = createTRPCRouter({
//   testAi:premiumProcedure.mutation(async()=>{
//   await inngest.send({
//     name:"execute/ai",
//   });
//   return {success:true, message:"job queued"}
//   }),
//   getWorkflows: protectedProcedure
//     .query(({ctx}) => {
//       return  prisma.workflow.findMany();
//     }),
//     createWorkflow:protectedProcedure.mutation(async ()=>{
//        await inngest.send({
//         name:"test/hello.world",
//         data:{
//           email:"harshit@gmail.com"
//         },
//        })
//       return {success:true, message:"job queued"}
//     })
// });
// // export type definition of API
// export type AppRouter = typeof appRouter;