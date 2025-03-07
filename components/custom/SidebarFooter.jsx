"use client";

import { HelpCircle, LogOut, Settings, Wallet2 } from "lucide-react";
import React, { useState } from "react";
import { Button } from "../ui/button";

import LogOutDialog from "./LogOutDialog";

function SideBarFooter() {
  const [openDialogLogOut, setOpenDialogLogOut] = useState(false);

  const options = [
    {
      name: "Settings",
      icon: Settings,
    },
    {
      name: "My Subscription",
      icon: Wallet2,
    },
    {
      name: "Help Center",
      icon: HelpCircle,
    },
  ];

  const handleSignOut = () => {
    localStorage.removeItem("user");
  };

  return (
    <div className=" mb-4  flex flex-col">
      {options.map((option, index) => (
        <Button
          size="sm"
          variant="ghost"
          className="w-full justify-start"
          key={index}
        >
          <option.icon /> {option.name}
        </Button>
      ))}
      <Button
        onClick={() => setOpenDialogLogOut(true)}
        size="sm"
        variant="ghost"
        className="w-full justify-start"
      >
        <LogOut className="w-5 h-5 " />
        Sign Out
      </Button>
      <LogOutDialog
        openDialog={openDialogLogOut}
        closeDialog={setOpenDialogLogOut}
      />
    </div>
  );
}

export default SideBarFooter;
