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
<<<<<<< HEAD:src/components/screens/Login/index.tsx
      className="flex flex-col items-center justify-center gap-3 bg-accent py-4 px-5 rounded-lg"
=======
      className="flex flex-col items-center justify-center gap-3 bg-accent py-4 px-5 mb-auto mt-12 rounded-lg"
>>>>>>> 4df0a6bdff7cfcdc350cb7bf5a90a0a74e708598:src/components/Login/index.tsx
      onSubmit={handleLogin}
    >
      <div className="flex flex-col items-center">
        <h2 className="text-2xl font-semibold">Sign in</h2>
        <h4 className="italic text-base">
          Welcome back traveler, glad to see you again!
        </h4>
      </div>

<<<<<<< HEAD:src/components/screens/Login/index.tsx
      <Button className="w-full !bg-transparent border border-accent-dark">
        <Discord />
=======
      <Button
        color="accent"
        className="!bg-transparent w-full !border !border-accent3 hover:!bg-accent2 gap-1"
      >
        <FaDiscord size="1.5em" />
>>>>>>> 4df0a6bdff7cfcdc350cb7bf5a90a0a74e708598:src/components/Login/index.tsx
        Discord
      </Button>

      <div className="flex items-center w-full">
        <div className="flex-grow bg-accent2 h-0.5 w-full"></div>
        <div className="flex-grow-0 mx-5 text dark:text-white">OR</div>
        <div className="flex-grow bg-accent2 h-0.5 w-full"></div>
      </div>

      <Input
<<<<<<< HEAD:src/components/screens/Login/index.tsx
        color="accent-dark"
=======
        color="accent"
>>>>>>> 4df0a6bdff7cfcdc350cb7bf5a90a0a74e708598:src/components/Login/index.tsx
        label="email"
        className="border-accent3"
        {...register("email")}
        errors={errors}
      />
      <Input
        type="password"
<<<<<<< HEAD:src/components/screens/Login/index.tsx
        color="accent-dark"
=======
        color="accent"
>>>>>>> 4df0a6bdff7cfcdc350cb7bf5a90a0a74e708598:src/components/Login/index.tsx
        label="password"
        className="border-accent3"
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
<<<<<<< HEAD:src/components/screens/Login/index.tsx
        {/* <Button
          className="text-primary-200"
          as="anchor"
          href={ROUTES.register}
          styles="text"
        >
          Sign up
        </Button> */}
=======
        <Button className="!text-primary" asChild>
          <Link href={ROUTES.register}>Register</Link>
        </Button>
>>>>>>> 4df0a6bdff7cfcdc350cb7bf5a90a0a74e708598:src/components/Login/index.tsx
      </span>
    </form>
  );
}
