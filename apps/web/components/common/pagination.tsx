import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { twMerge } from "tailwind-merge";

enum SeparatorType {
  SeparatorStart = "start",
  SeparatorEnd = "end",
}

function generatePagination(currentPage: number, max: number) {
  const firstPage = 1;
  const lastPage = max;

  const offsetLeft = [...Array(5).keys()]
    .map((index) =>
      currentPage - index <= firstPage || currentPage - index === currentPage
        ? undefined
        : Math.abs(index - currentPage),
    )
    .reverse()
    .filter((page): page is number => page !== undefined);

  const offsetRight = [...Array(5).keys()]
    .map((index) =>
      currentPage + index >= lastPage || currentPage + index === currentPage
        ? undefined
        : currentPage + index,
    )
    .filter((page): page is number => page !== undefined);

  // Balance the offsets
  while (offsetLeft.length + offsetRight.length > 4) {
    if (offsetLeft.length > offsetRight.length) {
      offsetLeft.shift();
      continue;
    }
    if (offsetLeft.length < offsetRight.length) {
      offsetRight.pop();
      continue;
    }
    offsetLeft.shift();
    offsetRight.pop();
  }

  let pagination: (number | SeparatorType)[] = [firstPage];
  if (Math.abs(firstPage - currentPage) > 3) {
    pagination.push(SeparatorType.SeparatorStart);
  }

  pagination = pagination.concat(offsetLeft);

  if (currentPage !== firstPage && currentPage !== lastPage) {
    pagination.push(currentPage);
  }

  pagination = pagination.concat(offsetRight);

  if (Math.abs(lastPage - currentPage) > 3) {
    pagination.push(SeparatorType.SeparatorEnd);
  }

  if (lastPage !== firstPage) {
    pagination.push(lastPage);
  }

  return pagination;
}

function Separator() {
  return <div>...</div>;
}

interface PaginationProps {
  current: number;
  total: number;
  onChange: (page: number) => void;
  className?: string;
}

export default function Pagination({
  current,
  total,
  onChange,
  className,
}: PaginationProps) {
  function createOnChange(page: number) {
    return () => onChange(page);
  }

  const pagination = generatePagination(current, total);

  return (
    <nav className={twMerge("mx-auto flex gap-2", className)}>
      <button
        aria-label="Föregående sida"
        disabled={current === 1}
        onClick={createOnChange(current - 1)}
        className="disabled:opacity-60"
      >
        <ChevronLeftIcon className="h-3 w-3 sm:h-4 sm:w-4" />
      </button>

      {pagination.map((page) =>
        typeof page === "number" ? (
          <button
            key={page}
            onClick={createOnChange(page)}
            disabled={page === current}
            aria-current={page === current}
            className={twMerge(
              "h-6 w-6 rounded-full text-sm transition-colors sm:h-8 sm:w-8",
              "aria-current:bg-slate-200 dark:aria-current:bg-slate-600",
              "hover:bg-slate-200 dark:hover:bg-slate-600",
            )}
          >
            {page}
          </button>
        ) : (
          <Separator key={page} />
        ),
      )}

      <button
        aria-label="Nästa sida"
        disabled={current === total}
        onClick={createOnChange(current + 1)}
        className="disabled:opacity-60"
      >
        <ChevronRightIcon className="h-3 w-3 sm:h-4 sm:w-4" />
      </button>
    </nav>
  );
}
