"use client";

import React, { useEffect, useState } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import Header from "@/components/custom/Header";
import { MessagesContext } from "@/context/MessagesContext";
import { UserDetailContext } from "@/context/userDetailContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useConvex } from "convex/react";
import { api } from "@/convex/_generated/api";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/custom/AppSidebar";
import { ActionContext } from "@/context/ActionContext";
import { useRouter } from "next/navigation";

function Provider({ children }) {
  const [messages, setMessages] = useState();
  const [userDetail, setUserDetail] = useState();
  const [action, setAction] = useState();
  const router = useRouter();
  const convex = useConvex();

  useEffect(() => {
    isAuthenticated();
  }, []);

  const isAuthenticated = async () => {
    if (typeof window !== undefined) {
      const user = JSON.parse(localStorage.getItem("user"));

      if (!user) {
        router.push("/");
        return;
      }
      //fetch user from database
      const result = await convex.query(api.users.GetUser, {
        email: user?.email,
      });
      setUserDetail(result);
    }
  };

  return (
    <GoogleOAuthProvider
      clientId={process.env.NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_ID_KEY}
    >
      {" "}
      <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
        <MessagesContext.Provider value={{ messages, setMessages }}>
          <ActionContext.Provider value={{ action, setAction }}>
            {" "}
            <NextThemesProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem
              disableTransitionOnChange
            >
              <div className="relative min-h-screen w-full bg-dark text-white overflow-hidden">
                {/* Left Blue Radial Gradient */}
                <div className="absolute bottom-0 left-[-10%] top-[-20%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(0,123,255,.15),rgba(0,0,0,0))]"></div>

                {/* Right Blue Radial Gradient */}
                <div className="absolute bottom-0 right-[-20%] top-[20%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(0,123,255,.15),rgba(0,0,0,0))]"></div>

                <div className="relative z-10">
                  <SidebarProvider defaultOpen={false}>
                    <AppSidebar />
                    <main className="w-full">{children}</main>
                  </SidebarProvider>
                </div>
              </div>
            </NextThemesProvider>
          </ActionContext.Provider>
        </MessagesContext.Provider>
      </UserDetailContext.Provider>
    </GoogleOAuthProvider>
  );
}

export default Provider;
