import {parseAsInteger,parseAsString} from "nuqs/server"
import {Pagination}  from "@/config/constants";

export  const workflowsParams={
    page:parseAsInteger
    .withDefault(Pagination.DEFAULT_PAGE)
    .withOptions({clearOnDefault:true}),
    pageSize:parseAsInteger
    .withDefault(Pagination.DEFAULT_PAGE_SIZE)
    .withOptions({clearOnDefault:true}),
    search:parseAsString
    .withDefault("")
    .withOptions({clearOnDefault:true})
}