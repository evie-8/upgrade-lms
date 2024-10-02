"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { NewPasswordSchema } from "@/schemas";
import * as z from "zod";
import { BeatLoader } from "react-spinners";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "@/components/ui/input";
import { FormError, FormSuccess } from "@/components/auth/form-message";
import { useState, useTransition } from "react";
import AuthCard from "./auth-card";
import { newPassword } from "@/action-server/new-password";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next-nprogress-bar";

const NewPasword = () => {
  const searchParams = useSearchParams();

  const token = searchParams.get("token");
  const [pending, setPending] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const router = useRouter();

  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
    setError("");
    setSuccess("");
    setPending(() => {
      newPassword(values, token).then((data: any) => {
        if (data?.success) {
          form.reset();
          setSuccess(data.success);
          router.push("/auth/sign-in", {}, { showProgressBar: true });
        }

        if (data?.error) {
          form.reset();
          setError(data.error);
        }
      });
    });
  };
  return (
    <AuthCard
      headerLabel="Reset Password"
      messageLabel="Change your password"
      socials={false}
      backref="/auth/sign-in"
      backrefMessage="Back to sign in"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormSuccess message={success} />
          <FormError message={error} />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="w-full h-auto mb-5">
                <FormLabel className="mb-1">Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter a password"
                    type="password"
                    {...field}
                    disabled={pending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem className="w-full h-auto mb-5">
                <FormLabel className="mb-1">Confirm Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Renter password"
                    type="password"
                    {...field}
                    disabled={pending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <button
            className="w-full h-12 outline-none rounded-md text-base  font-semibold mb-7 border-2 border-transparent bg-primary text-white hover:bg-opacity-90 transition-all ease-out duration-[0.3s]"
            disabled={pending}
          >
            {pending ? <BeatLoader /> : "Change password"}
          </button>
        </form>
      </Form>
    </AuthCard>
  );
};

export default NewPasword;
