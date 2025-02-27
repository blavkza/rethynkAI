"use client";

import React, { useContext } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { UserDetailContext } from "@/context/userDetailContext";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";

function SignInDialog({ openDialog, closeDialog }) {
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const createUser = useMutation(api.users.CreateUser);
  const router = useRouter();

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log(tokenResponse);
      const userInfo = await axios.get(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        { headers: { Authorization: "Bearer" + tokenResponse?.access_token } }
      );

      console.log(userInfo);
      setUserDetail(userInfo?.data);

      //save user in database
      const user = userInfo.data;
      await createUser({
        name: user?.name,
        email: user?.email,
        picture: user?.picture,
        uid: uuidv4(),
      });

      //save user in localStorage
      if (typeof window !== undefined) {
        localStorage.setItem("user", JSON.stringify(user));
      }

      window.location.reload();
      closeDialog(false);

      router.refresh();
    },
    onError: (errorResponse) => console.log(errorResponse),
  });

  return (
    <Dialog open={openDialog} onOpenChange={closeDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center font-bold text-2xl mb-3">
            Sign In With Rethynk.AI
          </DialogTitle>
          <DialogDescription asChild>
            <div className="flex flex-col items-center justify-center mt-4 gap-4">
              <h2 className="text-center">
                To use Rethynk.AI you must log into an existing account or
                create one.
              </h2>
              <Button
                onClick={googleLogin}
                className="bg-zinc-800 hover:bg-zinc-600 text-zinc-200"
              >
                Sign In With Google
              </Button>
              <h2 className="text-center text-xs">
                By using Rethynk.AI, you agree to the collection of your data
                for analytics.
              </h2>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default SignInDialog;
