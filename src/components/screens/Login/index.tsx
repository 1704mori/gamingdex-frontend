"use client";
import { signIn } from "next-auth/react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Input from "../../Input";
import Button from "../../Button";
import { ROUTES } from "@/lib/helpers/consts";
import { useNotification } from "@/components/Notification";
import { getErrorMessage } from "@/lib/helpers/translateApiErrors";
import Link from "next/link";
import { FaDiscord } from "react-icons/fa";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{
    email: string;
    password: string;
  }>({
    resolver: zodResolver(loginSchema),
  });

  const notification = useNotification();

  const handleLogin = handleSubmit(async (data) => {
    signIn("credentials", {
      email: data.email,
      password: data.password,
    }).then((res) => {
      if (res?.error) {
        notification.add(getErrorMessage(res as any), "error");
      }
    });
  });

  return (
    <form
      className="flex flex-col items-center justify-center gap-3 bg-accent py-4 px-5 rounded-lg select-none"
      onSubmit={handleLogin}
    >
      <div className="flex flex-col items-center">
        <h2 className="text-2xl font-semibold">Sign in</h2>
        <h4 className="italic text-base">
          Welcome back traveler, glad to see you again!
        </h4>
      </div>

      <Button
        color="accent"
        className="!bg-transparent w-full !border !border-accent3 hover:!bg-accent2 gap-1"
      >
        <FaDiscord size="1.5em" />
        Discord
      </Button>

      <div className="flex items-center w-full">
        <div className="flex-grow bg-accent2 h-0.5 w-full"></div>
        <div className="flex-grow-0 mx-5 text dark:text-white">OR</div>
        <div className="flex-grow bg-accent2 h-0.5 w-full"></div>
      </div>

      <Input
        color="accent2"
        label="email"
        {...register("email")}
        errors={errors}
      />
      <Input
        type="password"
        color="accent2"
        label="password"
        {...register("password")}
        errors={errors}
      />
      <Button className="!text-primary mx-auto" asChild>
        <Link href={ROUTES.register}>Forgot my password</Link>
      </Button>
      <Button className="w-full" type="submit">
        Login
      </Button>
      <span>
        Don{"'"}t have an account?{" "}
        <Button className="!text-primary" asChild>
          <Link href={ROUTES.register}>Register</Link>
        </Button>
      </span>
    </form>
  );
}
