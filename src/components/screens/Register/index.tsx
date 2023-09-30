"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Input from "../../Input";
import Button from "../../Button";
import { ROUTES } from "@/lib/helpers/consts";
import { useNotification } from "@/components/Notification";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { authService } from "@/lib/services/auth";
import Spinner from "@/components/Spinner";

const registerSchema = z
  .object({
    username: z.string().min(3),
    email: z.string().email(),
    password: z.string().nonempty(),
    confirmPassword: z.string().nonempty()
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
  });

  const notification = useNotification();

  const onSubmit = handleSubmit(async (data) => {
    await authService.register({
      ...data,
    })
  });

  return (
    <div className="flex items-center gap-12 select-none">
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
        onSubmit={onSubmit}
      >
        <div className="flex flex-col items-center">
          <h2 className="text-xl font-semibold">Register</h2>
          <h4 className="italic text-base"></h4>
        </div>

        <Input
          color="accent2"
          label="username"
          {...register("username")}
          errors={errors}
        />
        <Input
          color="accent2"
          label="email"
          {...register("email")}
          errors={errors}
        />
        <Input
          type="password"
          color="accent2"
          label="confirm password"
          {...register("password")}
          errors={errors}
        />
        <Input
          type="password"
          color="accent2"
          label="password"
          {...register("confirmPassword")}
          errors={errors}
        />
        <button type="button" className="text-primary-light hover:underline text-sm self-start flex items-center">
          <ChevronLeft />
          <Link href={ROUTES.login}>Back to login</Link>
        </button>
        <Button
          className="w-full"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting && <Spinner />}
          Register
        </Button>
      </form>
    </div>
  );
}

Register.getLayout = function getLayout(page: React.ReactNode) {
  return (
    <html lang="en">
      <body>
        <div className="flex flex-col items-center justify-center min-h-screen">
          {page}
        </div>
      </body>
    </html>
  );
};
