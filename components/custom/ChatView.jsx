"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { MessagesContext } from "@/context/MessagesContext";
import { UserDetailContext } from "@/context/userDetailContext";
import { api } from "@/convex/_generated/api";
import Prompt from "@/data/Prompt";
import axios from "axios";
import { useConvex, useMutation } from "convex/react";
import { ArrowUp, Loader2Icon, Paperclip, PlusCircle } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useContext, useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import MiniSidebar from "./MiniSidebar";
import { useSidebar } from "../ui/sidebar";
import { ChatViewSkeletonCard } from "./ChatViewSkelenton";

function ChatView() {
  const messagesEndRef = useRef(null);
  const [input, setInput] = useState("");
  const [isFetching, setIsFetching] = useState(false);

  const { id } = useParams();
  const convex = useConvex();

  const { userDetail } = useContext(UserDetailContext);
  const { messages, setMessages } = useContext(MessagesContext);

  const UpdateMessages = useMutation(api.workplace.UpdateMessages);

  useEffect(() => {
    if (id) GetWorkplaceData();
  }, [id]);

  const GetWorkplaceData = async () => {
    const result = await convex.query(api.workplace.GetWorkplace, {
      workplaceId: id,
    });
    setMessages(Array.isArray(result?.messages) ? result.messages : []);
  };

  useEffect(() => {
    if (messages?.length > 0) {
      const role = messages[messages.length - 1]?.role;
      if (role === "user" && !isFetching) {
        GetAiResponse();
      }
    }
  }, [messages]);

  const GetAiResponse = async () => {
    setIsFetching(true);
    const PROMPT = JSON.stringify(messages) + Prompt.CHAT_PROMPT;
    try {
      const result = await axios.post("/api/ai-chat", { prompt: PROMPT });
      setMessages((prev) => [
        ...prev,
        { role: "ai", content: result.data.result },
      ]);
      await UpdateMessages({
        messages: [...messages, { role: "ai", content: result.data.result }],
        workplaceId: id,
      });
    } catch (error) {
      console.error("AI Response Error:", error);
    } finally {
      setIsFetching(false);
    }
  };

  const onGenerate = (input) => {
    setMessages((prev) => [...prev, { role: "user", content: input }]);
    setInput("");
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const { open } = useSidebar();

  return (
    <div className="relative h-[80vh] flex gap-3">
      {!open && <MiniSidebar />}
      <div className="flex flex-col w-full lg:w-[350px] xl:w-[470px]">
        {!messages ? (
          <div className="w-full flex-1">
            <ChatViewSkeletonCard />
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto custom-scrollbar rounded-md p-2">
            {messages?.map((message, index) => (
              <div
                className="bg-zinc-700/50 p-3 rounded-lg mb-2 flex items-start gap-4 leading-7"
                key={index}
              >
                {message?.role === "user" && userDetail?.picture && (
                  <Image
                    src={userDetail.picture}
                    height={32}
                    width={32}
                    className="rounded-full"
                    alt="User Profile"
                  />
                )}
                <div className="markdown-body chat-bubble prose prose-invert max-w-none">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeRaw]}
                  >
                    {message.content}
                  </ReactMarkdown>
                </div>
              </div>
            ))}
            {isFetching && (
              <div className="flex items-center gap-2 mt-2 bg-zinc-700/50 p-3 rounded-lg">
                <Loader2Icon className="w-5 h-5 animate-spin" /> Generating
                Response...
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
        <div className="p-5 bg-zinc-900/50 border border-l-blue-500 border-t-blue-500 rounded-xl max-w-5xl w-full mt-3 custom-shadow shadow-blue-300/50">
          <div className="flex gap-2 w-full">
            <textarea
              placeholder="What do you want to build today?"
              className="outline-none bg-transparent w-full h-24 max-h-56 resize-none overflow-auto text-muted-foreground hide-scrollbar"
              value={input}
              onChange={(e) => setInput(e.target.value)}
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
      </div>
    </div>
  );
}

export default ChatView;
