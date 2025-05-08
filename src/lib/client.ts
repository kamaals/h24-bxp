/* istanbul ignore file @preserve */
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_APP_URL,
  fetchOptions: {
    onSuccess: (ctx) => {
      const authToken = ctx.response.headers.get("set-auth-token"); // get the token from the response headers
      // Store the token securely (e.g., in localStorage)
      if (authToken) {
        localStorage.setItem("bearer_token", authToken);
      }
    },
  },
});

export const { signIn, signOut, signUp, useSession } = authClient;
