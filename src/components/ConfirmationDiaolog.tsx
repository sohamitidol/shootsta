import { toast } from "@/hooks/use-toast";
import { UseMutationResult } from "@tanstack/react-query";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

type Props<T> = {
  open: boolean;
  setOpen: any;
  id: number;
  deleteMutation: UseMutationResult<T, Error, number, unknown>;
};
export default function ConfirmationDialog<T>({
  open,
  setOpen,
  id,
  deleteMutation,
}: Props<T>) {
  function onDelete() {
    deleteMutation.mutate(id, {
      onSuccess: () => {
        toast({
          title: "Details removed successfully",
          variant: "destructive",
        });
      },

      onError: () => {
        toast({
          title: "Error removing details!",
          variant: "default",
        });
      },
    });

    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>This action cannot be undone.</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant={"default"} onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button variant={"destructive"} onClick={onDelete}>
            Delete
          </Button>
          <DialogClose onClick={() => setOpen(false)} />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
