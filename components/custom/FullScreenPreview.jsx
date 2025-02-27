"use client";

import Lookup from "@/data/Lookup";
import {
  SandpackProvider,
  SandpackLayout,
  SandpackPreview,
} from "@codesandbox/sandpack-react";

import { XCircle } from "lucide-react";
import React, { useState } from "react";

function FullScreenPreview({ setFullscreen }) {
  const [files, setFiles] = useState(Lookup?.DEFAULT_FILE);
  return (
    <div className="fixed inset-0 bg-zinc-900 z-40">
      <XCircle
        onClick={() => setFullscreen(false)}
        className="absolute top-3 right-4 rounded-full z-50 w-8 h-8"
      />

      <div className="">
        {" "}
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
          }}
        >
          <SandpackLayout>
            <SandpackPreview style={{ height: "100vh" }} showNavigator={true} />
          </SandpackLayout>
        </SandpackProvider>
      </div>
    </div>
  );
}

export default FullScreenPreview;
