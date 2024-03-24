import React from "react";
import Image from "next/image";

interface CardComponentProps {
  url: string;
  title: string;
  count: number;
}
const CardComponent = (props: CardComponentProps) => {
  const { url, title, count } = props;
  const imageUrl = `https://images.unsplash.com/${url}`;
  return (
    <div className="flex flex-col gap-2 w-fit">
      <div className="relative h-[220px] w-[295px]">
        <Image
          src={imageUrl}
          alt="Logo"
          fill
          unoptimized
          priority
          style={{ objectFit: "cover" }}
          className="rounded-[8px] overflow-hidden"
        />
      </div>
      <div className="text-lg flex flex-col gap-[6px]">
        <div className="text-[20px] font-semibold">{title}</div>
        <div className="text-sm font-normal">{count} properties</div>
      </div>
    </div>
  );
};

export default CardComponent;
