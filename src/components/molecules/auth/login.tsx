"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/atoms/card";
import React from "react";
import { signIn } from "@/lib/client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { BorderBeam } from "@/components/atoms/border-beam";
import { LoginType } from "@/lib/types/user";
import { loginSchema } from "@/lib/zod-schemas/user";
import { Form } from "@/components/atoms/form";
import RHFInput from "@/components/atoms/rhf/rhf-input";
import LoadingButton from "@/components/molecules/loading-button/loading-button";

export default function Login() {
  const [loading, setLoading] = React.useState(false);
  const form = useForm<LoginType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "john@doe.aes",
      password: "Element@AI",
    },
  });

  const handleLogin = React.useCallback(async (data: LoginType) => {
    try {
      setLoading(true);
      const { error } = await signIn.email({
        ...data,
        callbackURL: "/dashboard",
      });
      if (error) {
        toast.error(error.message);
        setLoading(false);
      }
    } catch {
      setLoading(false);
    }
  }, []);
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
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleLogin)}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <RHFInput name={"email"} label={"Email"} />
              </div>
              <div className="grid gap-2">
                <RHFInput
                  name={"password"}
                  label={"Password"}
                  type={"password"}
                />
              </div>
              <div className={"py-4 flex justify-end animate"}>
                <LoadingButton loading={loading} type={"submit"}>
                  Sign in
                </LoadingButton>
              </div>
            </div>
          </form>
        </Form>
      </CardContent>
      <BorderBeam />
    </Card>
  );
}
