import  {SidebarTrigger} from "@/components/ui/sidebar"

export const AppHeader=()=>{
    return(
        <header className="flex h-4 shrink-0 items-center gap-2 border-b px-4 bg-background">
            <SidebarTrigger/>
        </header>
    )
}