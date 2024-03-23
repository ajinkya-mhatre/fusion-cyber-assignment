import React from "react";
import Image from "next/image";

interface CardComponentProps {
  url: string;
  title: string;
  count: number;
}
const CardComponent = (props: CardComponentProps) => {
  const { url, title, count } = props;
  return (
    <div className="flex-ic flex-col gap-2">
      <Image src={url} alt="Logo" width={295} height={220} />
      <div className="text-lg flex-ic flex-col gap-[6px]">
        <div className="text-[20px] font-semibold">{title}</div>
        <div className="text-sm font-normal">{count} properties</div>
      </div>
    </div>
  );
};

export default CardComponent;
