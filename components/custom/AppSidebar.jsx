"user client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";
import Logo from "./Logo";
import { Button } from "../ui/button";
import { MessageCircleCode, PanelRightClose } from "lucide-react";
import SidebarHistory from "./SidebarHistory";
import SideBarFooter from "./SidebarFooter";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function AppSidebar() {
  const { toggleSidebar } = useSidebar();
  const router = useRouter();

  const newChat = () => {
    router.push("/");
  };
  return (
    <Sidebar>
      <SidebarHeader className="p-2">
        <div className="flex justify-between items-center px-4 mb-2">
          <Logo />{" "}
          <PanelRightClose
            onMouseEnter={toggleSidebar}
            className="w-6 h-6 mt-1"
          />
        </div>{" "}
        <Button
          onClick={() => {
            newChat();
            toggleSidebar();
          }}
          size="sm"
        >
          <MessageCircleCode /> Start New Chat
        </Button>
        <h2 className="font-medium text-lg text-center text-zinc-400">
          Your Chat
        </h2>
      </SidebarHeader>

      <SidebarContent className="p-5 custom-scrollbar">
        <SidebarGroup />
        <SidebarHistory />
        {/* <SidebarGroup />*/}
      </SidebarContent>
      <SidebarFooter>
        <SideBarFooter />
      </SidebarFooter>
    </Sidebar>
  );
}
