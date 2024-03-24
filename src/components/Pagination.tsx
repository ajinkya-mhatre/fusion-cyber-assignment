import React, { useState } from "react";
import Button from "@/components/Button";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

export interface PaginationProps {
  initialPage?: number;
  onPageChange: (value: number) => void;
  pageSize: number;
  totalCount: number;
}

const Pagination = (props: PaginationProps) => {
  const { initialPage = 1, onPageChange, pageSize, totalCount } = props;

  const [currentPage, setCurrentPage] = useState(initialPage);
  const pageCount = Math.ceil(totalCount / (pageSize || 0));

  const onNext = () => {
    setCurrentPage((page) => Math.min(page + 1, pageCount));
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    setCurrentPage((page) => Math.max(page - 1, 1));
    onPageChange(currentPage - 1);
  };

  const generateVisiblePageNumbers = () => {
    const visiblePages = [];
    for (
      let i = Math.max(currentPage - 3, 1);
      i <= Math.min(currentPage + 3, pageCount);
      i++
    ) {
      visiblePages.push(i);
    }
    return visiblePages;
  };

  const visiblePageNumbers = generateVisiblePageNumbers();
  const showPrevOverflow = visiblePageNumbers[0] > 1;
  const showNextOverflow =
    visiblePageNumbers[visiblePageNumbers.length - 1] < pageCount;

  return (
    <div className="flex select-none gap-2">
      <Button
        type="secondary"
        text=""
        disabled={currentPage === 1}
        onClick={onPrevious}
        className="text-[#2F80ED] w-fit"
        borderColorForSecondary={"border-[#2F80ED]"}
        icon={<MdKeyboardArrowLeft />}
      />
      {showPrevOverflow && <span className="p-2 text-[#2F80ED]">...</span>}
      {visiblePageNumbers.map((pageNumber) => {
        return (
          <Button
            key={pageNumber}
            type="secondary"
            text={pageNumber.toString()}
            className={`text-[#2F80ED] w-fit ${currentPage === pageNumber ? "bg-[#2F80ED] text-white" : ""}`}
            borderColorForSecondary={"border-[#2F80ED]"}
            onClick={() => {
              setCurrentPage(pageNumber);
              onPageChange(pageNumber);
            }}
          />
        );
      })}
      {showNextOverflow && <span className="p-2 text-[#2F80ED]">...</span>}
      <Button
        type="secondary"
        text=""
        disabled={currentPage === pageCount}
        onClick={onNext}
        className="text-[#2F80ED] w-fit"
        borderColorForSecondary={"border-[#2F80ED]"}
        icon={<MdKeyboardArrowRight />}
      />
    </div>
  );
};

export default Pagination;
