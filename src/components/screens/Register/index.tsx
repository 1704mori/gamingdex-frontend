"use client";
import { signIn } from "next-auth/react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Input from "../../Input";
import Button from "../../Button";
import { ROUTES } from "@/lib/helpers/consts";
import { Discord } from "iconoir-react";
import { useNotification } from "@/components/Notification";
import { getErrorMessage } from "@/lib/helpers/translateApiErrors";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

const loginSchema = z
  .object({
    username: z.string().min(3),
    email: z.string().email(),
    password: z.string(),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof loginSchema>>({
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
    <div className="flex items-center gap-12">
      <div className="flex flex-col gap-2 mb-auto">
        <div className="flex items-center">
          <img
            src="logo_mini.svg"
            alt="logo"
            className="w-16 h-24 rounded-full"
          />
          <img
            src="logo_name.svg"
            alt="logo"
            className="w-32 h-24 rounded-full"
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold break-words whitespace-nowrap">
            Hello there, traveler!
            <br></br>
            Glad to see you here.
          </h1>

          <h2 className="text-xl font-semibold">
            Join our community and start your journey
          </h2>
        </div>
      </div>
      <form
        className="flex flex-col items-center justify-center gap-3 bg-accent py-4 px-5 rounded-lg"
        onSubmit={handleLogin}
      >
        <div className="flex flex-col items-center">
          <h2 className="text-xl font-semibold">Register</h2>
          <h4 className="italic text-base"></h4>
        </div>

        <Input
          color="accent-dark"
          label="username"
          {...register("username")}
          errors={errors}
        />
        <Input
          color="accent-dark"
          label="email"
          {...register("email")}
          errors={errors}
        />
        <Input
          type="password"
          color="accent-dark"
          label="confirm password"
          {...register("password")}
          errors={errors}
        />
        <Input
          type="password"
          color="accent-dark"
          label="password"
          {...register("confirmPassword")}
          errors={errors}
        />
        <button className="text-primary-light hover:underline text-sm self-start flex items-center">
          <ChevronLeft />
          <Link href={ROUTES.login}>Back to login</Link>
        </button>
        <Button className="w-full" type="submit">
          Register
        </Button>
      </form>
    </div>
  );
}

Register.getLayout = function getLayout(page: React.ReactNode) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {page}
    </div>
  );
};
