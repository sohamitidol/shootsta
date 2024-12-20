import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "./ui/pagination";

type Props = {
  page: number;
  setPage: (page: number) => void;
  total: number;
  limit: number;
};

export default function Paginate({ page, setPage, total, limit }: Props) {
  const totalPages = Math.ceil(total / limit);

  const getPageNumbers = () => {
    const maxVisible = 5;
    const pages: number[] = [];

    if (page > 2) {
      pages.push(1);
    }

    const start = Math.max(2, page - 1);
    const end = Math.min(totalPages - 1, page + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (page < totalPages - 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const pages = getPageNumbers();

  return (
    <Pagination className="flex justify-end me-4">
      {" "}
      {/* Align pagination to the end */}
      <PaginationContent>
        {/* Previous Button */}
        <PaginationItem
          className={`cursor-pointer ${
            page === 1 ? "opacity-50 pointer-events-none" : ""
          }`}
          onClick={() => handlePageChange(page - 1)}
        >
          <ChevronLeft size={18} />
        </PaginationItem>

        {/* Page Numbers */}
        {pages.map((pageNumber, index) => (
          <PaginationItem
            key={index}
            className={`cursor-pointer ${
              pageNumber === page ? "bg-gray-200 dark:bg-gray-800" : ""
            }`}
            onClick={() => handlePageChange(pageNumber)}
          >
            <PaginationLink isActive={pageNumber === page}>
              {pageNumber}
            </PaginationLink>
          </PaginationItem>
        ))}

        {/* Ellipsis */}
        {page < totalPages - 2 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {/* Next Button */}
        <PaginationItem
          className={`cursor-pointer ${
            page === totalPages ? "opacity-50 pointer-events-none" : ""
          }`}
          onClick={() => handlePageChange(page + 1)}
        >
          <ChevronRight size={18} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
