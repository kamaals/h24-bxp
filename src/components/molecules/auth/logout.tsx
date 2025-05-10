"use client";
import React from "react";
import { Button } from "@/components/atoms/button";
import { useRouter } from "next/navigation";
import { signOut } from "@/lib/client";
import { LogOutIcon } from "lucide-react";

function Logout() {
  const router = useRouter();
  return (
    <div>
      <Button
        variant="ghost"
        data-testid="logout-btn"
        onClick={() => {
          signOut?.({
            fetchOptions: {
              onSuccess: () => {
                router.push("/login");
                router.refresh();
              },
            },
          });
        }}
      >
        <LogOutIcon /> Logout
      </Button>
    </div>
  );
}

export default Logout;
