"use client"
import { useCreateWorkflow, useRemoveWorkflow, useSuspenseWorkflows } from "../hooks/use-workflows"
import { EmptyView, EntityContainer, EntityHeader, EntityItem, EntityList, EntityPagination, EntitySearch, ErrorView, LoadingView } from "@/components/entity-components";
import { useUpgradeModal } from "@/hooks/use-upgrade-modal";
import { useRouter } from "next/navigation";
import { useWorkflowsParams } from "../hooks/use-workflows-params";
import { useEntitySearch } from "@/hooks/use-entity-search";
import type{ Workflow} from "@/generated/prisma";
import { WorkflowIcon } from "lucide-react";
import {formatDistanceToNow} from "date-fns"


export const WorkflowsSearch=()=>{
  const [params,setParams]=useWorkflowsParams();
  const {searchValue,onSearchChange}=useEntitySearch({
    params,
    setParams,
  })
  // {console.log("Value:",searchValue);}
   return (
    <EntitySearch
    value={searchValue}
    onChange={onSearchChange}
    placeholder="Search workflows"
    />
   )
}
export const WorkflowsList=()=>{

  const workflows = useSuspenseWorkflows(); 

   return(
    <EntityList 
    items={workflows.data.items}  
    getKey={(workflow)=>workflow.id}
    renderItem={(workflow)=><WorkflowItem data={workflow}/>}
    emptyView={<WorkflowsEmpty/>}
    />
   )

  // if(workflows.data.items.length===0){
  //   return(
  //     <WorkflowsEmpty/>
  //   )
  // }

  //   return(
  //     <div className="flex-1 flex justify-center items-center">
  //     <p>
  //       {JSON.stringify(workflows.data,null,2)}
  //     </p>
  //     </div>
  //   )

} 

export const WorkflowsHeader=({disabled}:{disabled?:boolean})=>{
  const router=useRouter();
  const createWorkflow=useCreateWorkflow();

   const {handleError,modal}=useUpgradeModal()
  const handleCreate=()=>{
    createWorkflow.mutate(undefined,{
      onSuccess:(data)=>{
        router.push(`/workflows/${data.id}`)
      }, 
      onError:(err)=>{
        handleError(err);
      }
    })
  }
  return (
    <>
    {modal}
     <EntityHeader  title="Workflows"
     description="Create and manage your workflows" 
     onNew={handleCreate}
     newButtonLabel="New Workflow"
     disabled={disabled}
     isCreating={createWorkflow.isPending}
     />
    </>
  )
}

export const WorkflowsPagination=()=>{
  const workflows=useSuspenseWorkflows();
  const [params,setParams]=useWorkflowsParams();

  return(
    <EntityPagination
    disabled={workflows.isFetching}
    totalPages={workflows.data.totalPages}
    page={workflows.data.page}
    onPageChange={(page)=>setParams({...params,page})}
    />
  )
}

export const WorkflowsContainer=({
  children
}:{children:React.ReactNode})=>{
  return (
    <EntityContainer
    header={<WorkflowsHeader/>}
    search={<WorkflowsSearch/>}
    pagination={<WorkflowsPagination/>}
    >
      
      {children}
      </EntityContainer>
  )
};

export const WorkflowsLoading=()=>{
  return <LoadingView message="Loading Workflows..."/>
}
export const WorkflowsError=()=>{
  return <ErrorView message="Error loading Workflows..."/>
}
export const WorkflowsEmpty=()=>{
  const router=useRouter();
  const createWorkflow=useCreateWorkflow();
  const {handleError,modal}=useUpgradeModal();

  const handleCreate=()=>{
    createWorkflow.mutate(undefined,{
      onError:(error)=>{
        handleError(error);
      },
      onSuccess:(data)=>{
        router.push(`/workflows/${data.id}`)
      }
    })
  }
  return (
    <>
    {modal}
    <EmptyView onNew={handleCreate} 
    message="No workflows found. Get Started by creating you first Workflow" />
    </>
  )
}

export const WorkflowItem=({
  data,
}:{data:Workflow})=>{
  const removeWorkflow =useRemoveWorkflow();
  const handleRemove=()=>{
    removeWorkflow.mutate({id:data.id});
  }
  return(
    <EntityItem  
    href={`/workflows/${data.id}`}
    title={data.name}
    subtitle={
      <>
      Updated {formatDistanceToNow(data.updatedAt , {addSuffix:true})}{""}
      &bull;Created{" "}
      {formatDistanceToNow(data.createdAt , {addSuffix:true})}
      </>
    } 
    image={
      <div className=" size-8 flex items-center justify-center">
        <WorkflowIcon className="size-5 text-muted-foreground"/>
      </div>
    }
    onRemove={handleRemove}
    isRemoving={removeWorkflow.isPending}
    />
  )
}