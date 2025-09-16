import { Table } from "@tanstack/react-table";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Input } from "../ui/input";
import { useState } from "react";
import { TableProps } from "./DataTable";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
  tableProps: TableProps;
}

export function DataTablePagination<TData>({
  table,
  tableProps,
}: DataTablePaginationProps<TData>) {
  const { page, totalPages, pageSize, setPage, setPageSize, setTotalPages } =
    tableProps;
  const canGoPrevPage = page ? page > 1 : false;
  const canGoNextPage = page && totalPages ? page < totalPages : false;
  console.log(canGoNextPage);

  const goFirstPage = () => {
    setPage(1);
  };

  const goPreviousPage = () => {
    setPage(page - 1);
  };

  const goNextPage = () => {
    setPage(page + 1);
  };

  const goLastPage = () => {
    setPage(totalPages);
  };

  return (
    <div className="w-full flex flex-col md:flex-row items-center justify-center lg:justify-end px-2">
      {/* <div className="text-muted-foreground flex-1 text-sm">
        {table.getFilteredSelectedRowModel().rows.length} of{" "}
        {table.getFilteredRowModel().rows.length} row(s) selected.
      </div> */}
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Rows: </p>
          <Select
            value={`${pageSize}`}
            onValueChange={(value) => {
              setPageSize(Number(value));
              table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 25, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            className="hidden size-8 lg:flex"
            onClick={goFirstPage}
            disabled={!canGoPrevPage}
          >
            <span className="sr-only">Go to first page</span>
            <ChevronsLeft />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="size-8"
            onClick={goPreviousPage}
            disabled={!canGoPrevPage}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeft />
          </Button>
          <div className="flex items-center justify-center text-sm font-medium">
            {tableProps.page} {" / "}
            {tableProps.totalPages}
          </div>
          <Button
            variant="outline"
            size="icon"
            className="size-8"
            onClick={goNextPage}
            disabled={!canGoNextPage}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRight />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="hidden size-8 lg:flex"
            onClick={goLastPage}
            disabled={!canGoNextPage}
          >
            <span className="sr-only">Go to last page</span>
            <ChevronsRight />
          </Button>
        </div>
      </div>
    </div>
  );
}
