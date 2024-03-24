import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useRouter } from "next/router";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { FaSquareFacebook } from "react-icons/fa6";

import Input from "@/components/Input";
import Button from "@/components/Button";
import AuthPagesLayout from "@/pages/auth/AuthPagesLayout";
import { EMAIL_REGEX } from "@/utils/constants";
import Loader from "@/components/Loader";

export interface LoginFormData {
  email: string;
  password: string;
}

const LoginForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const methods = useForm<LoginFormData>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onLoginSubmit = async (data: LoginFormData) => {
    console.log("input", data);
    try {
      setIsLoading(true);
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: data.email, password: data.password }),
      });
      if (response.ok) {
        await router.push("/home?loggedIn=true");
      }
      setIsLoading(false);
    } catch (error: any) {
      console.error("Registration Failed:", error);
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={(e) => void methods.handleSubmit(onLoginSubmit)(e)}>
        <AuthPagesLayout>
          <div className="flex justify-center text-[28px] font-semibold leading-8 mb-10">
            Sign in
          </div>
          <Input
            name="email"
            type="email"
            label="Email address"
            registerOptions={{
              pattern: {
                value: EMAIL_REGEX,
                message: "Invalid email format",
              },
            }}
          />
          <Input
            name="password"
            type="password"
            label="Password"
            showPassword={true}
            registerOptions={{
              required: {
                value: true,
                message: "Password is required",
              },
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/,
                message:
                  "Password must contain at least one uppercase letter, one lowercase letter, and one number",
              },
              minLength: {
                value: 10,
                message: "Password must be at least 10 characters long",
              },
            }}
          />
          <div className="flex-ic justify-end">
            <Link href={""} className="text-sm font-medium text-[#2F80ED]">
              Forgot password?
            </Link>
          </div>
          <Button
            isSubmit={true}
            text="Continue with email"
            className="bg-[#2F80ED]"
            icon={isLoading && <Loader />}
            disabled={isLoading}
          />
          <div className="flex-ic justify-between">
            <div className="h-[1px] bg-[#E0E0E0] w-full" />
            <div className="text-sm text-[#4F4F4F] px-4 py-[3px] whitespace-nowrap">
              or use one of these options
            </div>
            <div className="h-[1px] bg-[#E0E0E0] w-full" />
          </div>
          <Button
            type="secondary"
            icon={<FcGoogle size={22} />}
            text="Continue with Google"
            className="text-[#4F4F4F]"
          />
          <Button
            icon={<FaSquareFacebook size={22} />}
            text="Continue with Facebook"
            className="bg-[#475993]"
          />
          <div className="flex-ic justify-center text-sm text-[16px] whitespace-nowrap gap-1 pt-10">
            <div className="text-[#4F4F4F]">Don’t have an account?</div>
            <Link href="/auth/register" className="text-[#2F80ED]">
              Register
            </Link>
          </div>
        </AuthPagesLayout>
      </form>
    </FormProvider>
  );
};

function Index() {
  return <LoginForm />;
}

export default Index;
