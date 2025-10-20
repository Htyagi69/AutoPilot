import { Button } from "@/components/ui/button";
import prisma from "@/lib/db"
const Page=async()=>{
   const users=await prisma.user.findMany();
  return(
    <div className="min-h-screen min-w-screen flex justify-center items-center">
         <div >
          {JSON.stringify(users)}
         </div>
    <Button>
         Click me
    </Button>
    </div>
  )
}

export default Page;  

//for delete all content do=> nox prisma migrate reset