import { signIn } from "next-auth/react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Input from "../Input";
import Button from "../Button";
import { ROUTES } from "@/lib/helpers/consts";
import { Discord } from "iconoir-react";
import { useNotification } from "@/components/Notification";
import { getErrorMessage } from "@/lib/helpers/translateApiErrors";

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
      className="flex flex-col items-center justify-center gap-3 dark:bg-gray-500 py-4 px-5 rounded-lg"
      onSubmit={handleLogin}
    >
      <div className="flex flex-col items-center">
        <h2 className="text-2xl font-semibold">Sign in</h2>
        <h4 className="italic text-base">
          Welcome back traveler, glad to see you again!
        </h4>
      </div>

      <Button
        color="transparent"
        className="w-full !border !border-gray-400"
        icon={<Discord />}
      >
        Discord
      </Button>

      <div className="flex items-center w-full">
        <div className="flex-grow dark:bg-gray-450 h-0.5 w-full"></div>
        <div className="flex-grow-0 mx-5 text dark:text-white">OR</div>
        <div className="flex-grow dark:bg-gray-450 h-0.5 w-full"></div>
      </div>

      <Input
        color="secondary"
        label="email"
        {...register("email")}
        errors={errors}
      />
      <Input
        type="password"
        color="secondary"
        label="password"
        {...register("password")}
        errors={errors}
      />
      <button className="text-primary-200 mx-auto">Forgot my password</button>
      <Button className="w-full" type="submit">
        Login
      </Button>
      <span>
        Don{"'"}t have an account?{" "}
        <Button
          className="text-primary-200"
          as="anchor"
          href={ROUTES.register}
          styles="text"
        >
          Sign up
        </Button>
      </span>
    </form>
  );
}
