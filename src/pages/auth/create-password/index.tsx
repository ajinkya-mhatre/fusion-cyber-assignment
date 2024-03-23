import React, { useContext, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/router";

import Input from "@/components/Input";
import Button from "@/components/Button";
import AuthPagesLayout from "@/pages/auth/AuthPagesLayout";
import { GlobalStateContext } from "@/pages/_app";

export interface CreatePasswordFormData {
  password: string;
  confirmPassword: string;
}

const CreatePasswordForm = () => {
  const router = useRouter();
  const globalState = useContext(GlobalStateContext);
  const [isLoading, setIsLoading] = useState(false);

  const methods = useForm<CreatePasswordFormData>({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onCreatePasswordSubmit = async (data: CreatePasswordFormData) => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password: data.password,
          confirmPassword: data.confirmPassword,
        }),
      });
      if (response.ok) {
        await router.push("/auth/login");
      }
      globalState.setToastText(
        "Password created successfully",
        "alert-success",
      );
      setIsLoading(false);
    } catch (error: any) {
      globalState.setToastText("Password creation Failed", "alert-error");
    }
  };

  const password = methods.watch("password");

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={(e) => void methods.handleSubmit(onCreatePasswordSubmit)(e)}
      >
        <AuthPagesLayout>
          <div className="flex justify-center text-[28px] font-semibold leading-8 mb-4">
            Create password
          </div>
          <div className="text-base font-normal text-center pb-10">
            Use a minimum of 10 characters, including letters, lowercase
            letters, and numbers.
          </div>
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
          <Input
            name="confirmPassword"
            type="password"
            label="Confirm password"
            showPassword={true}
            registerOptions={{
              required: {
                value: true,
                message: "Password is required",
              },
              validate: (value) =>
                value === password || "The passwords do not match",
            }}
          />
          <Button
            isSubmit={true}
            text="Createa account"
            className={`bg-[#2F80ED] ${isLoading && "animate-pulse"}`}
            disabled={isLoading}
          />
          <div className="text-[#4F4F4F] text-sm">
            By creating an account, you agree with our{" "}
            <Link href="" className="text-[#2F80ED]">
              Terms and Conditions&nbsp;
            </Link>
            and{" "}
            <Link href="" className="text-[#2F80ED]">
              Privacy Statement.
            </Link>
          </div>
        </AuthPagesLayout>
      </form>
    </FormProvider>
  );
};

function Index() {
  return <CreatePasswordForm />;
}

export default Index;
