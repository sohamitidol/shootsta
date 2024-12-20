import NavMenu from "@/components/NavMenu";
import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Edit3, Trash2 } from "lucide-react";

import AddDoctorFormDialog from "@/components/AddDoctorFormDialog";
import ConfirmationDialog from "@/components/ConfirmationDiaolog";
import LimitDropdown from "@/components/LimitDropdown";
import Paginate from "@/components/Paginate";
import SearchBox from "@/components/SearchBox";
import { TableData } from "@/components/TableData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getImageUrl } from "@/lib/utils";
import { useDeleteDoctor } from "@/services/mutations";
import { useDoctors } from "@/services/queries";
import { Doctor } from "@/types/doctor";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { useState } from "react";

const columns: ColumnDef<Doctor>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => <div className="capitalize">{row.original.id}</div>,
  },
  {
    accessorKey: "imageFileKey",
    header: "Image",
    cell: ({ row }) => (
      <Avatar className="h-8 w-8 rounded-lg">
        <AvatarImage
          src={getImageUrl(row.original.imageFileKey)}
          className="h-10 w-10 rounded-lg"
        />
        <AvatarFallback className="h-8 w-8 rounded-lg ">DR.</AvatarFallback>
      </Avatar>
    ),
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <div className="capitalize">{row.original.name}</div>,
  },
  {
    accessorKey: "age",
    header: "Age",
    cell: ({ row }) => <div className="capitalize">{row.original.age}</div>,
  },
  {
    accessorKey: "specialty",
    header: "Specialty",
    cell: ({ row }) => (
      <div className="capitalize">{row.original.specialty ?? "--"}</div>
    ),
  },
  {
    accessorKey: "contact",
    header: "Contact",
    cell: ({ row }) => (
      <div className="lowercase">{row.original.contact ?? "--"}</div>
    ),
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => (
      <div className="lowercase">{row.original.description ?? "--"}</div>
    ),
  },
  {
    accessorKey: "delete",
    header: "Delete",
    cell: () => <Trash2 size={16} />,
  },
  {
    accessorKey: "update",
    header: "Edit",
    cell: () => <Edit3 size={16} className="cursor-pointer" />,
  },
];
export default function Doctors() {
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(5);
  const [search, setSearch] = useState<string | null>();
  const [open, setOpen] = useState(false);
  const deleteDoctorMutation = useDeleteDoctor();

  const { data, isPending, isError } = useDoctors({
    page,
    limit,
    search,
  });

  const table = useReactTable({
    data: data?.data ?? [],
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isError) {
    return <div>Something went wrong while fetching data...</div>;
  }

  return (
    <>
      <NavMenu />
      <div className="w-full items-center">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start py-4 m-12">
            <h1 className="text-2xl font-bold mb-2">Doctors</h1>
          </div>

          <div className="flex items-center justify-end py-4 m-2">
            <div>
              <SearchBox setSearch={setSearch} />
            </div>
            <div className="mx-4">
              <Button
                variant="default"
                onClick={() => {
                  setOpen(true);
                }}
              >
                Create
              </Button>
            </div>
          </div>
        </div>
        <div className="rounded-md border">
          <TableData<Doctor>
            isPending={isPending}
            table={table}
            columns={columns}
            deleteMutation={deleteDoctorMutation}
          />
        </div>
        <div className="flex items-center justify-end space-x-2 py-4">
          <LimitDropdown setLimit={setLimit} currentLimit={limit} />
          <Paginate
            page={page}
            setPage={setPage}
            limit={limit}
            total={data?.total || 0}
          />
        </div>
        {open ? <AddDoctorFormDialog open={open} setOpen={setOpen} /> : null}
      </div>
    </>
  );
}
