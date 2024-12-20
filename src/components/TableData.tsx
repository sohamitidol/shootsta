import { toast } from "@/hooks/use-toast";
import { UseMutationResult } from "@tanstack/react-query";
import { flexRender, Table as TableType } from "@tanstack/react-table";
import { useState } from "react";
import ConfirmationDialog from "./ConfirmationDiaolog";
import EditAmbulanceFormDialog from "./EditAmbulanceFormDialog";
import EditDoctorFormDialog from "./EditDoctorFormDialog";
import { LoadingSpinner } from "./LoadingSpinner";
import { Dialog } from "./ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

type Props<T> = {
  table: TableType<T>;
  isPending: boolean;
  columns: any;
  deleteMutation: UseMutationResult<T, Error, number, unknown>;
};

export function TableData<T>({
  table,
  isPending,
  columns,
  deleteMutation,
}: Props<T>) {
  const [openEditDoctorDialog, setOpenEditDoctorDialog] = useState(false);
  const [openEditAmbulanceDialog, setOpenEditAmbulanceDialog] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [id, setId] = useState<number>(0);

  return (
    <div className=" rounded-md shadow-md">
      <Table className="table-auto w-full ">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    className="py-2 px-4 text-left text-sm font-medium text-gray-700"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {isPending ? (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="h-24 text-center align-middle"
              >
                <div className="flex justify-center items-center space-x-2">
                  <LoadingSpinner />
                </div>
              </TableCell>
            </TableRow>
          ) : table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    className="py-2 px-4 text-sm text-gray-100"
                    onClick={() => {
                      console.log("row", row.original);
                      console.log("cell", cell);
                      if (cell.id === `${row.id}_delete`) {
                        setDeleteDialog(true);
                        console.log(row.original);
                        // @ts-ignore
                        setId(row.original.id);
                      }
                      if (cell.id === `${row.id}_update`) {
                        // @ts-ignore
                        setId(row.original.id);
                        // @ts-ignore
                        if (row.original?.title) {
                          setOpenEditAmbulanceDialog(true);
                        } else {
                          setOpenEditDoctorDialog(true);
                        }
                      }
                    }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="h-24 text-center align-middle text-white"
              >
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {openEditDoctorDialog ? (
        <EditDoctorFormDialog
          open={openEditDoctorDialog}
          setOpen={setOpenEditDoctorDialog}
          id={id}
        />
      ) : null}
      {openEditAmbulanceDialog ? (
        <EditAmbulanceFormDialog
          open={openEditAmbulanceDialog}
          setOpen={setOpenEditAmbulanceDialog}
          id={id}
        />
      ) : null}
      {deleteDialog && id ? (
        <ConfirmationDialog<T>
          id={id}
          open={deleteDialog}
          setOpen={setDeleteDialog}
          deleteMutation={deleteMutation}
        />
      ) : null}
    </div>
  );
}
