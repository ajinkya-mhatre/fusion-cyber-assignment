import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { FcGoogle } from "react-icons/fc";
import { FaSquareFacebook } from "react-icons/fa6";
import Link from "next/link";

import Input from "@/components/Input";
import Button from "@/components/Button";
import AuthPagesLayout from "@/pages/auth/AuthPagesLayout";
import { EMAIL_REGEX } from "@/utils/constants";
import Loader from "@/components/Loader";

export interface RegisterFormData {
  email: string;
}

const RegisterForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const methods = useForm<RegisterFormData>({
    defaultValues: {
      email: "",
    },
  });

  const onRegisterSubmit = async (data: RegisterFormData) => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: data.email }),
      });
      if (response.ok) {
        await router.push(`/auth/create-password/${data.email}`);
      }
      setIsLoading(false);
    } catch (error: any) {
      console.log("error", error);
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={(e) => void methods.handleSubmit(onRegisterSubmit)(e)}>
        <AuthPagesLayout>
          <div className="flex justify-center text-[28px] font-semibold leading-8 mb-10">
            Register
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
            <div className="text-[#4F4F4F]">Already have an account?</div>
            <Link href="/auth/login" className="text-[#2F80ED]">
              Sign in
            </Link>
          </div>
        </AuthPagesLayout>
      </form>
    </FormProvider>
  );
};

function Index() {
  return <RegisterForm />;
}

export default Index;
