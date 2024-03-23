import React, { useState } from "react";
import { type RegisterOptions, useFormContext } from "react-hook-form";
import { resolveDotPath } from "@/utils/misc";
import { FiEye, FiEyeOff } from "react-icons/fi";

interface Props {
  name: string;
  label?: string;
  placeholder?: string;
  registerOptions: RegisterOptions;
  type?: "text" | "password" | "number" | "email";
  className?: string;
  labelClassName?: string;
  rootClassName?: string;
  isDisabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showPassword?: boolean;
}

function Input(props: Props) {
  const {
    name,
    label,
    placeholder = "",
    registerOptions,
    type = "text",
    className = "",
    labelClassName = "",
    rootClassName = "",
    isDisabled = false,
    onChange = () => null,
    showPassword = false,
  } = props;
  const methods = useFormContext();

  const isRequired =
    (typeof registerOptions.required === "object" &&
      registerOptions.required?.value) ||
    (typeof registerOptions.required === "boolean" && registerOptions.required);

  const field = methods.register(name, registerOptions);
  const errors = methods.formState.errors;

  const [passwordShown, setPasswordShown] = useState(false);

  return (
    <div className={` w-full ${rootClassName}`}>
      <div className="relative">
        {!!label ? (
          <label
            className={`text-sm whitespace-wrap mb-[10px] block sm:whitespace-nowrap text-[#181818] font-medium ${labelClassName}`}
            htmlFor={name}
          >
            {label} {isRequired ? <sup className="text-red-600">*</sup> : null}
          </label>
        ) : null}
        <input
          type={type === "password" && passwordShown ? "text" : type}
          className={`w-full rounded bg-[#F2F2F2] p-3 ${className}`}
          placeholder={placeholder}
          {...field}
          disabled={isDisabled}
          onChange={(e) => {
            void (async () => {
              await field.onChange(e);
            })();
            onChange(e);
          }}
          autoComplete={name}
        />
        {showPassword ? (
          <div className="absolute top-[58%] right-3">
            {passwordShown ? (
              <FiEyeOff
                className="cursor-pointer"
                size={18}
                onClick={() => {
                  setPasswordShown(false);
                }}
              />
            ) : (
              <FiEye
                className="cursor-pointer"
                size={18}
                onClick={() => {
                  setPasswordShown(true);
                }}
              />
            )}
          </div>
        ) : null}
      </div>
      {!!resolveDotPath(`${name}.message`, methods?.formState.errors) && (
        <div className="form-error mt-2 text-xs text-red-500">
          {resolveDotPath(`${name}.message`, methods?.formState.errors)}
        </div>
      )}
    </div>
  );
}

Input.defaultProps = {
  placeholder: "",
  label: "",
  type: "text",
};
export default Input;
