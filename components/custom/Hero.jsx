"use client";

import Lookup from "@/data/Lookup";
import { ArrowUp, Paperclip, PlusCircle } from "lucide-react";
import React, { useContext, useState } from "react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { MessagesContext } from "@/context/MessagesContext";
import { UserDetailContext } from "@/context/userDetailContext";
import SignInDialog from "./SignInDialog";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRouter } from "next/navigation";
import Header from "./Header";

function Hero() {
  const [input, setInput] = useState("");
  const [openDialog, setOpenDialog] = useState(false);

  const router = useRouter();

  const CreateWorkplace = useMutation(api.workplace.CreateWorkplace);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const { messages, setMessages } = useContext(MessagesContext);
  const { userDetail, setUserDetail } = useContext(UserDetailContext);

  const onGenerate = async (userInput) => {
    if (!userDetail?.name) {
      setOpenDialog(true);
      return;
    }

    const message = {
      role: "user",
      content: userInput,
    };

    setMessages([message]);

    const workplaceId = await CreateWorkplace({
      user: userDetail._id,
      messages: [message],
    });

    router.push("/workplace/" + workplaceId);
  };

  return (
    <>
      {" "}
      <Header />
      <div className="flex flex-col items-center mt-36 md:mt-28 gap-4 w-full justify-center">
        <h2 className="px-2 text-3xl md:text-5xl font-extrabold text-center">
          What do you want to build?
        </h2>
        <h2 className="text-xs md:text-lg text-muted-foreground">
          Prompt, run, edit, and deploy full-stack web applications.
        </h2>
        <div className="p-5 bg-zinc-900/50 border border-l-blue-500 border-t-blue-500 rounded-xl max-w-lg w-[90%] mt-24 md:mt-3 custom-shadow shadow-blue-300/50">
          <div className="flex gap-2">
            <textarea
              placeholder="What do you want to build today?"
              className="outline-none bg-transparent w-full h-24 max-h-56 resize-none overflow-auto text-muted-foreground hide-scrollbar"
              value={input}
              onChange={handleInputChange}
            />

            {input && (
              <ArrowUp
                onClick={() => onGenerate(input)}
                className="bg-blue-500 w-8 h-8 rounded-full p-2 cursor-pointer"
              />
            )}
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <PlusCircle className="w-5 h-5 cursor-pointer" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Upload File</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <div className="flex flex-wrap max-w-2xl items-center justify-center gap-2 mt-8">
          {Lookup?.SUGGSTIONS.map((suggestion, i) => (
            <h2
              onClick={() => onGenerate(suggestion)}
              className="p-1 px-2 rounded-full border text-xs text-muted-foreground hover:text-white cursor-pointer"
              key={i}
            >
              {suggestion}
            </h2>
          ))}
        </div>
        <SignInDialog
          openDialog={openDialog}
          closeDialog={(v) => setOpenDialog(v)}
        />
      </div>
    </>
  );
}

export default Hero;
