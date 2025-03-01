"use client";

import ChatView from "@/components/custom/ChatView";
import CodeView from "@/components/custom/CodeView";
import Header from "@/components/custom/Header";
import MiniSidebar from "@/components/custom/MiniSidebar";
import React, { useEffect } from "react";

function Workplace() {
  useEffect(() => {
    const randomValue = Math.random();
  }, []);

  return (
    <div className=" lg:fixed lg:top-0 lg:left-0 lg:right-0 lg:bottom-0">
      <Header />{" "}
      <div className="py-10 px-6 flex 2xl:justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-7 max-w-screen-2xl w-full">
          <ChatView />
          <div className="col-span-1 lg:col-span-2">
            <CodeView />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Workplace;
