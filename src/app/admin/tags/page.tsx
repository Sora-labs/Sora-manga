"use client";
import api from "@/app/_services/api";
import CustomDialog from "@/components/Dialogs/CustomDialog";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import CreateTagDialog from "./_components/CreateTagDialog";
import DataTable from "@/components/Tables/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import ActionButton from "@/components/Tables/ActionButton";

type TableColumn = {
  _id: string;
  name: string;
};

export default function TagsPage() {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<TableColumn[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [reload, setReload] = useState(false);

  const columns: ColumnDef<TableColumn>[] = [
    {
      accessorKey: "_id",
      header: "No.",
      cell: ({ row }) => (
        <a href={`/admin/tags/${row.original._id}`}>
          {row.index + (page - 1) * pageSize + 1}
        </a>
      ),
      size: 50,
      minSize: 50,
      maxSize: 70,
    },
    {
      accessorKey: "name",
      header: "Name",
      size: 150,
      minSize: 150,
      maxSize: 300,
    },
    {
      accessorKey: "action",
      header: "",
      size: 80,
      minSize: 70,
      maxSize: 100,
      cell: ({ row }) => (
        <div className="flex justify-end">
          <ActionButton
            id={row.original._id}
            detailUrl={`/admin/tags`}
            editUrl="/admin/tags/edit"
          />
        </div>
      ),
    },
  ];

  useEffect(() => {
    async function getTags() {
      try {
        const response = await api.get(
          `/api/tags?page=${page}&pageSize=${pageSize}`
        );
        if (response.data?.is_success) {
          const totalData = response.data.total_data;
          setTotalPages(Math.ceil(totalData / pageSize));
          setData(response.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch tags:", error);
      }
    }
    getTags();
  }, [page, pageSize, reload]);

  return (
    <div className="w-full p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold">Tags</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger>
            <Button>Add</Button>
          </DialogTrigger>
          <CustomDialog
            body={
              <CreateTagDialog
                reloadTable={reload}
                setReloadTable={setReload}
                setOpen={setOpen}
              />
            }
          />
        </Dialog>
      </div>
      <p>All the tags can be seen here.</p>

      <DataTable
        tableProps={{
          page,
          pageSize,
          totalPages,
          setPage,
          setPageSize,
          setTotalPages,
        }}
        columns={columns}
        data={data}
      />
    </div>
  );
}
