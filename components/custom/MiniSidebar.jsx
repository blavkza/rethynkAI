import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Edit3, MenuSquareIcon, PanelRightOpen } from "lucide-react";
import { useSidebar } from "../ui/sidebar";
import { useRouter } from "next/navigation";
import { ModeToggle } from "../ui/theme-toggle";

function MiniSidebar() {
  const { toggleSidebar } = useSidebar();
  const router = useRouter();
  return (
    <div className="bg-zinc-300/50 dark:bg-zinc-700/50 rounded-lg p-4 w-[60px] hidden md:flex flex-col justify-between h-full ">
      <div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Edit3
                onClick={() => {
                  router.push("/");
                }}
                className="w-5 h-5 cursor-pointer dark:text-white text-zinc-900"
              />
            </TooltipTrigger>
            <TooltipContent>
              <p>New Chat</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="flex flex-col items-center justify-between">
        {/*<div className="mb-10">
        
          <ModeToggle />
        </div> */}

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <PanelRightOpen
                onClick={toggleSidebar}
                className="w-6 h-6 dark:text-white text-zinc-900"
              />
            </TooltipTrigger>
            <TooltipContent>
              <p>Chats</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
}

export default MiniSidebar;
