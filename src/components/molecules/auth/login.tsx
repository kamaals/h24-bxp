"use client";

import { Button } from "@/components/atoms/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/atoms/card";
import { Input } from "@/components/atoms/input";
import { Label } from "@/components/atoms/label";
import { Checkbox } from "@/components/atoms/checkbox";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { signIn } from "@/lib/client";

import { BorderBeam } from "@/components/atoms/border-beam";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <Card className="max-w-sm w-full relative overflow-hidden shadow-md mt-8">
      <CardHeader>
        <CardTitle className="text-lg md:text-xl">
          <h4>Sign In</h4>
        </CardTitle>
        <CardDescription className="text-xs md:text-sm">
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              data-testid="email"
              id="email"
              type="email"
              placeholder="m@example.com"
              required
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              value={email}
            />
          </div>

          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
            </div>

            <Input
              data-testid="password"
              id="password"
              type="password"
              placeholder="password"
              autoComplete="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2">
            <Checkbox
              data-testid="remember"
              id="remember"
              onClick={() => {
                setRememberMe(!rememberMe);
              }}
            />
            <Label htmlFor="remember">Remember me</Label>
          </div>

          <Button
            data-testid="login-btn"
            type="submit"
            className="w-full"
            disabled={loading}
            onClick={async () => {
              setLoading(true);
              await signIn.email({
                email,
                password,
                callbackURL: "/dashboard",
              });
            }}
          >
            {loading ? (
              <Loader2
                data-testid={"loader"}
                size={16}
                className="animate-spin"
              />
            ) : (
              "Login"
            )}
          </Button>
        </div>
      </CardContent>
      <BorderBeam />
    </Card>
  );
}
