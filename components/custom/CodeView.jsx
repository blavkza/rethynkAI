"use client";

import React, { useContext, useEffect, useState } from "react";

import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackFileExplorer,
  SandpackPreview,
} from "@codesandbox/sandpack-react";
import Lookup from "@/data/Lookup";
import axios from "axios";
import Prompt from "@/data/Prompt";
import { MessagesContext } from "@/context/MessagesContext";
import { useConvex, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams } from "next/navigation";
import {
  Fullscreen,
  Loader2Icon,
  Monitor,
  Smartphone,
  XCircle,
} from "lucide-react";
import SandpackPreviewClient from "./SandpackPreview";
import { ActionContext } from "@/context/ActionContext";
import { Button } from "../ui/button";

function CodeView() {
  const [activeTab, setActiveTab] = useState("code");
  const [files, setFiles] = useState(Lookup?.DEFAULT_FILE);
  const [isLoading, setIsLoading] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [isPhoneScreen, setIsPhoneScreen] = useState(false);

  const { id } = useParams();
  const convex = useConvex();

  const { messages, setMessages } = useContext(MessagesContext);
  const { action, setAction } = useContext(ActionContext);

  const UpdateFiles = useMutation(api.workplace.UpdateFiles);

  useEffect(() => {
    if (id) {
      GetFiles();
    }
  }, [id]);

  useEffect(() => {
    setActiveTab("preview");
  }, [action]);

  const GetFiles = async () => {
    setIsLoading(true);
    try {
      const result = await convex.query(api.workplace.GetWorkplace, {
        workplaceId: id,
      });

      if (result?.fileData) {
        const mergedFiles = { ...Lookup?.DEFAULT_FILE, ...result?.fileData };
        setFiles(mergedFiles);
      }
    } catch (error) {
      console.error("Error fetching files:", error);
    }
    setActiveTab("code");
    setIsLoading(false);
  };

  useEffect(() => {
    if (
      messages?.length > 0 &&
      messages[messages?.length - 1]?.role === "user"
    ) {
      GenerateAiCode();
    }
  }, [messages]);

  const GenerateAiCode = async () => {
    setIsLoading(true);
    try {
      const PROMPT = JSON.stringify(messages) + " " + Prompt.CODE_GEN_PROMPT;
      const result = await axios.post("/api/ai-code", { prompt: PROMPT });
      const AiResponse = result.data;

      if (AiResponse?.files) {
        const mergedFiles = { ...Lookup?.DEFAULT_FILE, ...AiResponse?.files };
        setFiles(mergedFiles);

        await UpdateFiles({
          workplaceId: id,
          files: AiResponse?.files,
        });
      }
    } catch (error) {
      console.error("Error generating AI code:", error);
      if (error.response) {
        console.error("Server responded with:", error.response.data);
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Error setting up request:", error.message);
      }
    }
    setActiveTab("code");
    setIsLoading(false);
  };

  return (
    <div className="w-full relative">
      {!fullscreen ? (
        <>
          <div className="dark:bg-[#18181818] bg-zinc-900 w-full p-2 border">
            <div className="flex justify-between">
              <div className="flex gap-1 items-center justify-center flex-wrap shrink-0 bg-zinc-700/50 w-[120px] h-[35px] p-1 rounded-full">
                <h2
                  onClick={() => setActiveTab("code")}
                  className={`text-sm cursor-pointer ${
                    activeTab === "code"
                      ? "text-blue-500 bg-blue-500 bg-opacity-25 p-1 px-2 rounded-full"
                      : ""
                  }`}
                >
                  Code
                </h2>
                <h2
                  onClick={() => setActiveTab("preview")}
                  className={`text-sm cursor-pointer ${
                    activeTab === "preview"
                      ? "text-blue-500 bg-blue-500 bg-opacity-25 p-1 px-2 rounded-full"
                      : ""
                  }`}
                >
                  Preview
                </h2>
              </div>
              <Button
                onClick={() => setFullscreen(true)}
                variant="ghost"
                size="sm"
              >
                <Fullscreen />
              </Button>
            </div>
          </div>

          <SandpackProvider
            template="react"
            theme={"dark"}
            files={files}
            customSetup={{
              dependencies: {
                ...Lookup.DEPENDANCY,
              },
            }}
            options={{
              externalResources: ["https://cdn.tailwindcss.com"],
              layout: "console",
            }}
          >
            <SandpackLayout>
              {activeTab === "code" ? (
                <>
                  <SandpackFileExplorer style={{ height: "71vh" }} />
                  <SandpackCodeEditor style={{ height: "71vh" }} />
                </>
              ) : (
                <SandpackPreviewClient />
              )}
            </SandpackLayout>
          </SandpackProvider>
        </>
      ) : (
        <div className="fixed inset-0 bg-zinc-900 z-40 flex items-center justify-center">
          {/* Controls */}
          <div className="absolute top-3 right-4 rounded-full z-50 flex gap-3 items-center justify-between border-2 p-1 px-3 bg-zinc-600/50">
            {!isPhoneScreen ? (
              <Smartphone
                onClick={() => setIsPhoneScreen(true)}
                className="cursor-pointer"
              />
            ) : (
              <Monitor
                onClick={() => setIsPhoneScreen(false)}
                className="cursor-pointer"
              />
            )}
            <XCircle
              onClick={() => setFullscreen(false)}
              className="cursor-pointer"
            />
          </div>

          {/* Sandpack */}
          <SandpackProvider
            template="react"
            theme="dark"
            files={files}
            customSetup={{
              dependencies: { ...Lookup.DEPENDANCY },
            }}
            options={{
              externalResources: ["https://cdn.tailwindcss.com"],
            }}
          >
            <SandpackLayout>
              <SandpackPreview
                style={{
                  width: isPhoneScreen ? "340px" : "100vw",
                  height: isPhoneScreen ? "640px" : "100vh",
                  maxWidth: isPhoneScreen ? "375px" : "100vw",
                  maxHeight: isPhoneScreen ? "812px" : "100vh",
                  borderRadius: isPhoneScreen ? "20px" : "0px",
                  overflow: "hidden",
                  border: isPhoneScreen ? "5px solid #444" : "none",
                  transition: "all 0.3s ease-in-out",
                }}
                showNavigator={true}
              />
            </SandpackLayout>
          </SandpackProvider>
        </div>
      )}

      {isLoading && (
        <div className="p-10 bg-zinc-900 opacity-85 absolute top-0 h-full w-full flex flex-col gap-3 items-center justify-center">
          <Loader2Icon className="h-10 w-10 animate-spin text-white" />
          <h2 className="text-white">Generating Your Files...</h2>
        </div>
      )}
    </div>
  );
}

export default CodeView;
