import React, { useContext, useState, useEffect } from "react";
import Logo from "./Logo";
import { Button } from "../ui/button";
import { UserDetailContext } from "@/context/userDetailContext";
import Image from "next/image";
import { DownloadIcon, Rocket, PanelRightOpen, PanelLeft } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { ActionContext } from "@/context/ActionContext";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useSidebar } from "../ui/sidebar";
import SignInDialog from "./SignInDialog"; // Import SignInDialog component
import LogOutDialog from "./LogOutDialog";
import { ModeToggle } from "../ui/theme-toggle";

function Header() {
  const { userDetail } = useContext(UserDetailContext);
  const { action, setAction } = useContext(ActionContext);
  const [isLoading, setIsLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDialogLogOut, setOpenDialogLogOut] = useState(false);
  const { id } = useParams();
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  const onActionButton = (action) => {
    setAction({
      actionType: action,
      timeStamp: Date.now(),
    });
  };

  const { open, toggleSidebar } = useSidebar();

  return (
    <>
      <div className="p-4 flex items-center justify-between bg-none lg:px-8">
        <div className="flex gap-4">
          {!open && (
            <>
              {userDetail && !id && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <PanelLeft
                        onClick={toggleSidebar}
                        className="w-6 h-6 mt-1 dark:text-white text-zinc-900"
                      />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Chats</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
              <div className="hidden lg:flex">
                <Logo />
              </div>
              {/*Mobile view */}
              {id && (
                <div className="flex lg:hidden">
                  {" "}
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <PanelLeft
                          onClick={toggleSidebar}
                          className="w-6 h-6 mt-1 dark:text-white text-zinc-900"
                        />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Chats</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              )}

              {!id && (
                <div className="flex lg:hidden">
                  <Logo />
                </div>
              )}
            </>
          )}
        </div>

        {id && (
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="ghost"
              className="dark:text-white text-zinc-900"
              onClick={() => onActionButton("export")}
            >
              <DownloadIcon />
              Export
            </Button>
            <Button
              size="sm"
              onClick={() => onActionButton("deploy")}
              className="bg-blue-500 text-white hover:bg-blue-400"
            >
              <Rocket />
              Deploy
            </Button>
          </div>
        )}

        {!id && (
          <div>
            {isLoading ? (
              <div className="w-8 h-8 rounded-full bg-gray-300 animate-pulse"></div>
            ) : userDetail ? (
              <div className="flex gap-2">
                <ModeToggle />
                <div
                  onClick={() => setOpenDialogLogOut(true)}
                  className="flex items-center cursor-pointer"
                >
                  {userDetail.picture ? (
                    <Image
                      src={userDetail.picture}
                      height={32}
                      width={32}
                      className="rounded-full"
                      alt="User Profile"
                    />
                  ) : (
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-500 text-white font-bold">
                      {userDetail?.name?.charAt(0).toUpperCase() || "U"}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex gap-3">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setOpenDialog(true)}
                >
                  Sign In
                </Button>
                <Button
                  size="sm"
                  onClick={() => setOpenDialog(true)}
                  className="bg-blue-400 hover:bg-blue-300 text-white px-4 py-2 rounded-md"
                >
                  Get Started
                </Button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Integrating the SignInDialog */}
      <SignInDialog openDialog={openDialog} closeDialog={setOpenDialog} />
      <LogOutDialog
        openDialog={openDialogLogOut}
        closeDialog={setOpenDialogLogOut}
      />
    </>
  );
}

export default Header;
