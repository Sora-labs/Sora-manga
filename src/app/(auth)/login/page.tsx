"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const loginSchema = z.object({
  username: z
    .string()
    .min(1, "Username is required")
    .min(6, "Username must have at least 6 characters"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must have at least 6 characters"),
});

const Login = () => {
  const formProps = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
    mode: "onChange",
  });
  const router = useRouter();
  const {
    handleSubmit,
    control,
    formState: { errors },
    setError,
  } = formProps;

  const onSubmit = handleSubmit(async (data: any) => {
    console.log(data);
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((r) => r.json());

    if (!response.data?.is_success) {
      // show errors on both fields even if just one field has an error
      setError("username", {
        type: "manual",
        message: response.errors[0].message,
      });
      setError("password", {
        type: "manual",
        message: response.errors[0].message,
      });
      return;
    }
    router.replace("/");
    router.refresh();
  });

  return (
    <div className="flex flex-col justify-center w-xs lg:w-md bg:gray-100 dark:bg-gray-950 py-10 px-8 rounded-2xl border-2 border-gray-700">
      <h2 className="text-center text-4xl mb-4">Login</h2>
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
          <Button className="w-full" type="submit">
            Login
          </Button>
        </form>
      </Form>
      <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
        <Link href="/register" className="hover:underline">
          Create a new account
        </Link>
      </div>
    </div>
  );
};

export default Login;
