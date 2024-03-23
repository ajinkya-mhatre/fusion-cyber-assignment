import React, { MouseEventHandler, ReactNode } from "react";

interface Props {
  icon?: ReactNode;
  text: string;
  className?: string;
  onClick?: MouseEventHandler;
  type?: "primary" | "secondary" | "tertiary";
  disabled?: boolean;
  isSubmit?: boolean;
  borderColorForSecondary?: string;
}

function Button(props: Props) {
  const {
    icon,
    text,
    className,
    type = "primary",
    disabled = false,
    isSubmit,
    onClick,
    borderColorForSecondary,
  } = props;

  return (
    <button
      className={`w-full center text-[15px] font-medium
      rounded-[6px] px-[18px] py-[12px] cursor-pointer 
      ${type === "primary" && "text-white"} 
      ${type === "secondary" && `border-[1px] ${borderColorForSecondary ? borderColorForSecondary : "border-[#E0E0E0]"}`} 
      ${className}`}
      type={isSubmit ? "submit" : "button"}
      onClick={(e) => (!disabled && onClick ? onClick(e) : () => null)}
      disabled={disabled}
    >
      <div className="flex-ic justify-center gap-[10px] whitespace-nowrap">
        {icon && <div>{icon}</div>}
        {text}
      </div>
    </button>
  );
}

export default Button;
