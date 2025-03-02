import React from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { LogOut } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

function LogOutDialog({ openDialog, closeDialog }) {
  const router = useRouter();
  const handleSignOut = () => {
    localStorage.removeItem("user");

    router.push("/");
    window.location.reload();
    router.refresh();
  };

  return (
    <div>
      {" "}
      <Dialog open={openDialog} onOpenChange={closeDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-center mb-5">
              Are you sure you want to Sign Out?
            </DialogTitle>
            <DialogDescription asChild>
              <div className="flex items-center justify-center gap-5">
                <Button onClick={() => closeDialog()} variant="ghost">
                  Cancel
                </Button>
                <Button onClick={handleSignOut} variant="destructive">
                  Sign Out
                </Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default LogOutDialog;
