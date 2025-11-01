"use client"

import {Node,NodeProps,useReactFlow} from "@xyflow/react"
import {GlobeIcon} from "lucide-react"
import {memo, useState } from "react"
import { BaseExecutionNode } from "../base-execution-node"
import { err } from "inngest/types"
import { FormType, HttpRequestDialog } from "./dialog"

type HttpRequestNodeData={
    endpoint?:string;
    method?:"GET"| "POST"| "PATCH" | "DELETE";
    body?:string;
    [key:string]:unknown;
};

type HttpRequestNodeType=Node<HttpRequestNodeData>;

export const HttpRequestNode=memo((props:NodeProps<HttpRequestNodeType>)=>{
    const [dialogOpen,setDialogOpen]=useState(false)
    const {setNodes} =useReactFlow();

    const nodeStatus="initial"
    
    const handleOpenSettings=()=>setDialogOpen(true)

    const handleSubmit=(values:FormType)=>{
        setNodes((nodes)=>nodes.map((node)=>{
            if(node.id===props.id){
                return{
                    ...node,
                    data:{
                    endpoint:values.endpoint,
                    method:values.method,
                    body:values.body,
                    }
                }
            }
            return node;
        }))
    }

    const nodeData=props.data; 
    const description=nodeData?.endpoint?
    `${nodeData.method || "GET"}:${nodeData.endpoint}`
    :"Not configured";

    return(
        <>
        <HttpRequestDialog 
        open={dialogOpen}
         onOpenChange={setDialogOpen}
         onSubmit={handleSubmit}
         defaultEndpoint={nodeData.endpoint}
         defaultMethod={nodeData.method}
         defaultBody={nodeData.body}
         />
        <BaseExecutionNode 
        {...props}
        id={props.id}
        icon={GlobeIcon}
        name="Http Request"
        status={nodeStatus}
        description={description}
        onSettings={handleOpenSettings}
        onDoubleClick={handleOpenSettings}
        />
        </>
    )
})

HttpRequestNode.displayName="HttpRequestNode";