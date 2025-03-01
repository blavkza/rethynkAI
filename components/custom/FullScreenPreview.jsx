"use client";

import Lookup from "@/data/Lookup";
import {
  SandpackProvider,
  SandpackLayout,
  SandpackPreview,
} from "@codesandbox/sandpack-react";

import { Monitor, Smartphone, XCircle } from "lucide-react";
import React, { useState } from "react";

function FullScreenPreview({ setFullscreen }) {
  const [files, setFiles] = useState(Lookup?.DEFAULT_FILE);
  const [isPhoneScreen, setIsPhoneScreen] = useState(false);

  return (
    <div className="fixed inset-0 bg-zinc-900 z-40 flex items-center justify-center">
      {/* Controls */}
      <div className="absolute top-3 right-4 rounded-full z-50 flex gap-3 items-center justify-between border p-1 px-3 bg-zinc-600">
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
              height: isPhoneScreen ? "97vh" : "100vh",
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
  );
}

export default FullScreenPreview;
