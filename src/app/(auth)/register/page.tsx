"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { redirect } from "next/navigation";
import { handleShowFieldErrors } from "@/app/_utils";

const registerSchema = z.object({
  username: z
    .string()
    .min(1, "Username is required")
    .min(6, "Username must have at least 6 characters"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must have at least 6 characters"),
  confirmPassword: z
    .string()
    .min(1, "Confirm Password is required")
    .min(6, "Confirm Password does not match"),
});

export default function Register() {
  const formProps = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
    setError,
  } = formProps;

  const onSubmit = handleSubmit(async (data: any) => {
    if (data.password !== data.confirmPassword) {
      setError("confirmPassword", {
        type: "manual",
        message: "Passwords do not match",
      });
      return;
    }

    const payload = {
      username: data.username,
      password: data.password,
    };
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }).then((r) => r.json());

    if (!response.data?.is_success) {
      console.log("Register error", response);

      handleShowFieldErrors(response.errors, setError);
      return;
    }

    redirect("/login");
  });

  console.log("Register errors", errors);

  return (
    <div className="flex flex-col justify-center w-xs lg:w-md bg:gray-100 dark:bg-gray-950 py-10 px-8 rounded-2xl border-2 border-gray-700">
      <h2 className="text-center text-4xl mb-4">Register</h2>
      <Form {...formProps}>
        <form onSubmit={onSubmit} className="space-y-6 w-full">
          <FormField
            control={control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <Input
                  {...field}
                  type="text"
                  placeholder="Username"
                  className="input"
                />
                <FormDescription className="text-red-500">
                  {errors.username?.message}
                </FormDescription>
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <Input
                  {...field}
                  type="password"
                  placeholder="Password"
                  className="input"
                />
                <FormDescription className="text-red-500">
                  {errors.password?.message}
                </FormDescription>
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm password</FormLabel>
                <Input
                  {...field}
                  type="password"
                  placeholder="Confirm password"
                  className="input"
                />
                <FormDescription className="text-red-500">
                  {errors.confirmPassword?.message}
                </FormDescription>
              </FormItem>
            )}
          />
          <Button className="w-full" type="submit">
            Register
          </Button>
        </form>
      </Form>
      <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
        Already had an account?
        <Link href="/login" className="hover:underline px-1">
          Login
        </Link>
      </div>
    </div>
  );
}
