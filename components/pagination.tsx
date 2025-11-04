import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems?: number;
  baseUrl: string;
  searchParams?: Record<string, string>;
}

export function Pagination({
  currentPage,
  totalPages,
  totalItems,
  baseUrl,
  searchParams = {},
}: PaginationProps) {

  if (totalPages <= 1 || totalItems === 0) return null;

  const pages = [];
  const showPages = 5;
  let startPage = Math.max(1, currentPage - Math.floor(showPages / 2));
  const endPage = Math.min(totalPages, startPage + showPages - 1);

  if (endPage - startPage < showPages - 1) {
    startPage = Math.max(1, endPage - showPages + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  const createPageUrl = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    return `${baseUrl}?${params.toString()}`;
  };

  return (
    <div className="flex items-center justify-center gap-2">
      <Button
        variant="outline"
        size="icon"
        disabled={currentPage === 1}
      >
        <Link href={createPageUrl(currentPage - 1)}>
          <ChevronLeft className="h-4 w-4" />
        </Link>
      </Button>

      {startPage > 1 && (
        <>
          <Button variant="outline" size="sm" asChild>
            <Link href={createPageUrl(1)}>1</Link>
          </Button>
          {startPage > 2 && <span className="text-muted-foreground">...</span>}
        </>
      )}

      {pages.map((page) => (
        <Button
          key={page}
          variant={page === currentPage ? "default" : "outline"}
          size="sm"
          asChild
        >
          <Link href={createPageUrl(page)}>{page}</Link>
        </Button>
      ))}

      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && (
            <span className="text-muted-foreground">...</span>
          )}
          <Button variant="outline" size="sm" asChild>
            <Link href={createPageUrl(totalPages)}>{totalPages}</Link>
          </Button>
        </>
      )}

      <Button
        variant="outline"
        size="icon"
        disabled={currentPage === totalPages}
        aria-disabled={currentPage === totalPages}
      >
        <Link href={createPageUrl(currentPage + 1)}>
          <ChevronRight className="h-4 w-4" />
        </Link>
      </Button>
    </div>
  );
}
