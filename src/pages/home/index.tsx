import React, { useState } from "react";
import { useInfiniteQuery, useQuery } from "react-query";

import Header from "@/components/Header";
import SwiperContainer from "@/components/SwiperContainer";
import Warning from "@/components/Warning";
import CardComponent from "@/components/CardComponent";
import Loader from "@/components/Loader";
import Button from "@/components/Button";
import Pagination from "@/components/Pagination";

const Index = () => {
  const [page, setPage] = useState(1);
  const fetchFirstPageHotels = (page = 0) =>
    fetch("/api/get-paginated-hotels-Info?page=" + page).then((res) =>
      res.json(),
    );

  const fetchAllHotels = () =>
    fetch("/api/get-all-hotels-info").then((res) => res.json());

  const { data: allHotels, isLoading: isLoadingAllData } = useQuery(
    "getAllHotelsData",
    async () => fetchAllHotels(),
    {
      refetchOnWindowFocus: false,
    },
  );

  const allHotelsData = allHotels?.hotels;

  const { data, isLoading, fetchNextPage } = useInfiniteQuery(
    ["getHotelsData", page],
    async () => fetchFirstPageHotels(page),
    {
      getNextPageParam: (lastPage) => lastPage?.nextCursor,
      refetchOnWindowFocus: false,
    },
  );

  const hotels = (data?.pages || []).map((page: any) => page.hotels).flat(1);
  const handlePageChange = (value: number) => {
    setPage(value);
    void fetchNextPage();
  };

  return (
    <div className="sm:mx-[100px] relative p-4 sm:p-0 mb-16">
      <Header />
      <SwiperContainer />
      <Warning
        text="Check the latest COVID-19 restrictions before you travel."
        link="Learn more"
      />
      {allHotelsData?.length > 0 ? (
        <>
          <div className="flex items-start justify-between mt-16 flex-wrap">
            <div>
              <div className="text-[28px] font-semibold">
                Enjoy your dream vacation
              </div>
              <div className="text-base mt-4 max-w-[610px] text-[#333333]">
                Plan and book our perfect trip with expert advice, travel tips,
                destination information and inspiration from us
              </div>
            </div>
            {allHotelsData?.length > 4 && (
              <Button
                text="View all"
                className="max-w-fit py3 px-3 bg-[#2F80ED] md:py-[10px] md:px-[18px] text-sm md:text-[15px] mt-4 sm:m-0"
              />
            )}
          </div>
          <div className="mt-8 flex-ic gap-4 justify-center lg:justify-between flex-wrap gap-y-2">
            {allHotelsData?.slice(0, 4).map((hotel: any) => {
              return (
                <CardComponent
                  key={hotel.id}
                  url={hotel.image}
                  title={hotel.country}
                  count={hotel.property_count}
                />
              );
            })}
          </div>
        </>
      ) : null}
      {hotels?.length > 0 ? (
        <>
          <div className="flex items-start justify-between mt-16 flex-wrap">
            <div className="text-[28px] font-semibold">Popular hotels</div>
            {hotels?.length > 8 && (
              <Button
                text="View all"
                className="max-w-fit py3 px-3 bg-[#2F80ED] md:py-[10px] md:px-[18px] text-sm md:text-[15px] mt-4 sm:m-0"
              />
            )}
          </div>
          <div className="mt-8 flex-ic gap-4 justify-center lg:justify-between flex-wrap gap-y-2 mb-4">
            {hotels?.slice(0, 8).map((hotel: any) => {
              return (
                <CardComponent
                  key={hotel.id}
                  url={hotel.image}
                  title={hotel.name}
                  count={hotel.property_count}
                />
              );
            })}
          </div>
          <Pagination
            initialPage={page}
            onPageChange={(page) => handlePageChange(page)}
            pageSize={8}
            totalCount={allHotelsData?.length || 0}
          />
        </>
      ) : null}
      {(isLoadingAllData || isLoading) && (
        <div className="h-28 flex-ic justify-center w-full">
          <Loader />
        </div>
      )}
    </div>
  );
};

export default Index;
