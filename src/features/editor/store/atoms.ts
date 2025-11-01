import type { ReactFlowInstance } from "@xyflow/react";
import {atom }  from "jotai"// we are using it for saving the node

export const editorAtom=atom<ReactFlowInstance| null>(null);