import {useQuery} from "@tanstack/react-query"
import { authClient } from "@/lib/auth-client"
import { queryKeys } from "inngest"
import { subscribe } from "diagnostics_channel"

export const useSubscription=()=>{
    return useQuery({    //this helps us to maintain the user state wheter premium or free
        queryKey:["subscription"],
        queryFn:async()=>{
            const {data}=await authClient.customer.state();
            return data;
        }
    })
}

export const useHasActiveSubscription=()=>{ 
    const {data:customerState,isLoading,...rest}=useSubscription();

    const  hasActiveSubscription=
    customerState?.activeSubscriptions &&
    customerState.activeSubscriptions.length>0;
   return {
    hasActiveSubscription,
    subscription:customerState?.activeSubscriptions?.[0],
    isLoading,
    ...rest,
   }
}