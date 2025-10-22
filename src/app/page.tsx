import { requireAuth } from "@/lib/auth-utils";
import { caller } from "@/trpc/server";
import { LogoutButton } from "./logout";

const Page= async()=>{
  await requireAuth()
  const  data=await caller.getUsers();
return(

     <div className="min-h-screen min-w-screen flex justify-center items-center flex-col gap-y-6">
       Protected Server Component
      <div>
         {JSON.stringify(data)}
         <LogoutButton/>
      </div>
    </div>
  )
}

export default Page;  




// "use client"
// import { authClient } from "@/lib/auth-client" 
// import { Button } from "@/components/ui/button"
// const Page=()=>{
//   const { data } = authClient.useSession() 
// return(
//      <div className="min-h-screen min-w-screen flex justify-center items-center">
//        {JSON.stringify(data)}
//       {data &&(<Button onClick={()=>authClient.signOut()}>
//           Logout
//        </Button>)}
//     </div>
//   )
// }

// export default Page;  




// import {getQueryClient,trpc} from '@/trpc/server'
// import {Client} from './client';
// import { dehydrate,HydrationBoundary } from '@tanstack/react-query';
// import { Suspense } from 'react';
// const Page=async()=>{
//      const queryClient=getQueryClient();
//      void queryClient.prefetchQuery(trpc.getUsers.queryOptions());

// return(
//      <div className="min-h-screen min-w-screen flex justify-center items-center">
//          <HydrationBoundary state={dehydrate(queryClient)}>
//           <Suspense fallback={<p>loading...</p>}>
//                <Client/>
//           </Suspense>
//          </HydrationBoundary>
//     </div>
//   )
// }

// export default Page;  

// //for delete all content do=> nox prisma migrate reset