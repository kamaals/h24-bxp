"use client";
import React from "react";
import { Button } from "@/components/atoms/button";
import { useRouter } from "next/navigation";
import { signOut } from "@/lib/client";

function Logout() {
  const router = useRouter();
  return (
    <div>
      <Button
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
        Logout
      </Button>
    </div>
  );
}

export default Logout;
