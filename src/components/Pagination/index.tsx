import { classes } from "@/lib/helpers/common";
import { ArrowLeft, ArrowRight } from "iconoir-react";
import { useCallback, useState } from "react";

interface Props {
  total: number;
  perPage?: number;
  buttons?: boolean;
  onPageClick: (page: number) => void;
}

export default function Pagination(props: Props) {
  const { total, perPage = 15, buttons = true, onPageClick } = props;

  const [currentPage, setCurrentPage] = useState<number>(1);

  const range = (start: number, end: number) => {
    return [...Array(end - start + 1)].map((_, i) => start + i);
  };

  return (
    <div className="flex items-center flex-wrap justify-center m-auto py-1">
      {buttons && (
        <button
          className="flex items-center px-2 m-1 h-8 rounded-lg transition-colors hover:bg-gray-150 dark:hover:bg-gray-450 disabled:cursor-not-allowed disabled:hover:bg-gray-150/30 disabled:dark:hover:bg-gray-450/30"
          disabled={currentPage === 1}
        >
          <ArrowLeft />
          <span className="text-sm font-medium">Back</span>
        </button>
      )}
      {range(1, Math.ceil(total / perPage)).map((number, index) => (
        <div
          className={classes(
            "flex items-center justify-center w-min min-w-[2rem] h-8 p-2 m-1 font-medium cursor-pointer rounded-full transition-colors",
            number === currentPage && "bg-primary",
            number !== currentPage && "hover:bg-gray-150 dark:hover:bg-gray-450"
          )}
          key={index}
          onClick={() => {
            onPageClick(number);
            setCurrentPage(number);
          }}
        >
          {number}
        </div>
      ))}
      {buttons && (
        <button
          className="flex items-center px-2 m-1 h-8 rounded-lg transition-colors hover:bg-gray-150 dark:hover:bg-gray-450 disabled:cursor-not-allowed disabled:hover:bg-gray-150/30 disabled:dark:hover:bg-gray-450/30"
          disabled={currentPage === Math.ceil(total / perPage)}
        >
          <span className="text-sm font-medium">Next</span>
          <ArrowRight />
        </button>
      )}
    </div>
  );
}
