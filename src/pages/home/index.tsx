import React from "react";

import Header from "@/components/Header";
import SwiperContainer from "@/components/SwiperContainer";
import { useQuery } from "react-query";
import Warning from "@/components/Warning";
import CardComponent from "@/components/CardComponent";

const Index = () => {
  const { data } = useQuery("getHotelsData", async () => {
    const response = await fetch("/api/getHotelsInfo", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.json();
  });
  console.log("data", data);
  return (
    <div className="sm:mx-[100px] relative">
      <Header />
      <div className="p-4">
        <SwiperContainer />
      </div>
      <Warning
        text="Check the latest COVID-19 restrictions before you travel."
        link="Learn more"
      />
      <div>
        {data?.hotels?.map((hotel: any) => {
          return (
            <div key={hotel.id}>
              <CardComponent
                url={hotel.image}
                title={hotel.country}
                count={hotel.property_count}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Index;
