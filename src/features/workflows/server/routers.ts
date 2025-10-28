import { Input } from "@/components/ui/input";
import { Pagination } from "@/config/constants";
import { NodeType } from "@/generated/prisma";
import prisma from "@/lib/db";
import { createTRPCRouter, premiumProcedure, protectedProcedure } from "@/trpc/init";
import {generateSlug} from "random-word-slugs"
import z from "zod";
import type {Node,Edge} from "@xyflow/react"
export const workflowsRouter=createTRPCRouter({
    create:protectedProcedure.mutation(({ctx})=>{
return prisma.workflow.create({
    data:{
        name:generateSlug(4),
        userId:ctx.auth.user.id,
        nodes:{
          create:{
            type:NodeType.INITIAL,
            positon:{x:0,y:0},
            name:NodeType.INITIAL,
          }
        }
    }
})
    }),
    remove:protectedProcedure
    .input(z.object({id:z.string()}))
    .mutation(({ctx,input})=>{
        return prisma.workflow.delete({
            where:{
                id: input.id,
                userId:ctx.auth.user.id,
            }
        })
    }),
    updateName:protectedProcedure
    .input(z.object({id:z.string(),name:z.string().min(1)}))
    .mutation(({ctx,input})=>{
        return prisma.workflow.update({
            where:{
                id: input.id,
                userId:ctx.auth.user.id,
            },
            data:{name:input.name},
        })
    }),
    getOne:protectedProcedure
    .input(z.object({id:z.string()}))
    .query(async({ctx,input})=>{
        const workflow=await prisma.workflow.findUniqueOrThrow({
            where:{  id:input.id,userId:ctx.auth.user.id},
            include:{nodes:true,connection:true},
        });
        //Tranforming the server nodes to react flow compatible nodes
        const nodes:Node[]=workflow.nodes.map((node)=>({
          id:node.id,
          type:node.type,
          position:node.positon as {x:number ,y:number},
          data:(node.data as Record<string,unknown>) || {},
        }));
        //Tranforming the server connections to react flow compatible nodes
        const edges:Edge[]=workflow.connection.map((connections)=>({
           id:connections.id,
           source:connections.fromNodeId,
           target:connections.toNodeId,
           sourceHandle:connections.fromOutput,
           targetHandle:connections.toInput,
        }));
        return {
          id:workflow.id,
          name:workflow.name,
          nodes,
          edges,
        };
    }),
    getMany:protectedProcedure
    .input(z.object({
        page:z.number().default(Pagination.DEFAULT_PAGE),
        pageSize:z.number()
        .min(Pagination.MIN_PAGE_SIZE)
        .max(Pagination.MAX_PAGE_SIZE)
        .default(Pagination.DEFAULT_PAGE_SIZE),
    search:z.string().default(""),
    })
)
    .query(async({ctx,input})=>{
        const {page,pageSize,search}=input;
const [items, totalCount] = await Promise.all([
  prisma.workflow.findMany({
    skip: (page - 1) * pageSize,
    take: pageSize,
    where: {
      userId: ctx.auth.user.id,
      name: {
        contains: search,
        mode: "insensitive",
      },
    },
    orderBy: {
      updatedAt: "desc",
    },
  }),
  prisma.workflow.count({
    where: {
      userId: ctx.auth.user.id,
      name: {
        contains: search,
        mode: "insensitive",
      },
    },
  }),
]);
       const totalPages=Math.ceil(totalCount/pageSize);
       const hasNextPage=page<totalPages;
       const hasPreviousPage=page>1;
        
       return{
        items:items,
        page,
        pageSize,
        totalCount,
        totalPages,
        hasNextPage,
        hasPreviousPage,
       }
    }),
}) 