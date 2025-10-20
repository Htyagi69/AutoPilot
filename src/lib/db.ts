//this prevents hot reload maen it never create new instance on each reload

import { PrismaClient } from "@/generated/prisma";

const globalForPrisma=global as unknown as {
    prisma:PrismaClient;
}

const prisma=globalForPrisma.prisma || new PrismaClient();

if(process.env.NODE_ENV!="production"){
    globalForPrisma.prisma=prisma;
}

export default prisma;



//normally 

// import { PrismaClient } from "@/generated/prisma";


// const prisma= new PrismaClient();

// export default prisma;

