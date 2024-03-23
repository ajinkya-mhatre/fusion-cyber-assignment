import React from "react";
import { CiWarning } from "react-icons/ci";
import Link from "next/link";

interface WarningProps {
  text: string;
  link?: string;
}
const Warning = (props: WarningProps) => {
  const { text, link } = props;
  return (
    <div className="flex-ic gap-2 p-4 rounded-[8px] bg-[#FCEFCA] font-normal mt-16">
      <CiWarning size={24} />
      <div className="text-[16px]">
        {text}&nbsp;
        <Link href="/" className="text-[#2F80ED]">
          {link}
        </Link>
      </div>
    </div>
  );
};

export default Warning;
