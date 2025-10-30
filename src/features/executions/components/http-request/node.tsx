"use client"

import type {Node,NodeProps,useReactFlow} from "@xyflow/react"
import {GlobeIcon} from "lucide-react"
import {memo, useState } from "react"
import { BaseExecutionNode } from "../base-execution-node"
import { err } from "inngest/types"

type HttpRequestNodeData={
    endpoint?:string;
    method?:"GET"| "POST"| "PATCH" | "DELETE";
    body?:string;
    [key:string]:unknown;
};

type HttpRequestNodeType=Node<HttpRequestNodeData>;

export const HttpRequestNode=memo((props:NodeProps<HttpRequestNodeType>)=>{
    const nodeData=props.data as HttpRequestNodeData;
    const description=nodeData?.endpoint?
    `${nodeData.method || "GET"}:${nodeData.endpoint}`
    :"Not configured";
    return(
        <>
        <BaseExecutionNode 
        {...props}
        id={props.id}
        icon={GlobeIcon}
        name="Http Request"
        description={description}
        onSettings={()=>{}}
        onDoubleClick={()=>{}}
        />
        </>
    )
})

HttpRequestNode.displayName="HttpRequestNode";