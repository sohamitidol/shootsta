import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog.tsx";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { useAddAmbulance, useAddDoctor } from "@/services/mutations";
import { zodResolver } from "@hookform/resolvers/zod";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { QueryClient, useQueryClient } from "@tanstack/react-query";
import { FormProvider, useForm } from "react-hook-form"; // Import FormProvider
import { z } from "zod";
import FileInput from "./FileInput"; // Assuming FileInput is in the same directory
import { LoadingSpinner } from "./LoadingSpinner";

// Zod schema
const schema = z.object({
  id: z.number().optional(),
  title: z.string().min(1, "Name is required"),
  contact: z
    .string()
    .min(1, "Contact is required")
    .email("Invalid email address"),
  description: z.string().min(1, "Description is required"),
  location: z.string().optional(),
  imageFileKey: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

type Props = {
  open: boolean;
  setOpen: any;
};

const AddAmbulanceFormDialog = ({ open, setOpen }: Props) => {
  const methods = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const {
    handleSubmit,
    reset,
    formState: { errors },
  } = methods;
  const queryClient = useQueryClient();
  const addAmbulanceMutation = useAddAmbulance();

  const onSubmit = (data: FormData) => {
    addAmbulanceMutation.mutate(data, {
      onSuccess: () => {
        toast({
          title: "Ambulance details added successfully",
          variant: "default",
        });
        reset();

        setOpen(false);
        queryClient.invalidateQueries({ queryKey: ["ambulances"] });
      },
      onError: () => {
        toast({
          title: "Something went wrong!",
          variant: "default",
        });
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="shadow-lg rounded-lg max-w-lg w-full p-6 opacity-100">
        <DialogTitle>
          <h2>Add Ambulance</h2>
        </DialogTitle>

        <FormProvider {...methods}>
          {" "}
          {/* Wrap form in FormProvider */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium">
                Title
              </label>
              <Input
                id="name"
                {...methods.register("title")}
                placeholder="Enter title"
                className="mt-1"
              />
              {errors.title && (
                <p className="text-red-600 text-xs">{errors.title.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="contact" className="block text-sm font-medium">
                Contact
              </label>
              <Input
                id="contact"
                {...methods.register("contact")}
                placeholder="Enter ambulance's contact"
                className="mt-1"
              />
              {errors.contact && (
                <p className="text-red-600 text-xs">{errors.contact.message}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium"
              >
                Description
              </label>
              <Textarea
                id="description"
                {...methods.register("description")}
                placeholder="Enter description"
                className="mt-1"
              />
              {errors.description && (
                <p className="text-red-600 text-xs">
                  {errors.description.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="location" className="block text-sm font-medium">
                Location
              </label>
              <Input
                id="location"
                {...methods.register("location")}
                placeholder="Enter location"
                className="mt-1"
              />
              {errors.location && (
                <p className="text-red-600 text-xs">
                  {errors.location.message}
                </p>
              )}
            </div>

            <div>
              <FileInput
                id="imageFileKey"
                name="imageFileKey"
                label="Upload File"
                required={true}
              />
              {/* {errors.file && (
								<p className="text-red-600 text-xs">File is required</p>
							)} */}
            </div>

            <DialogFooter className="flex items-center ">
              <Button type="submit">Submit</Button>
              <DialogClose asChild>
                <Button variant="outline" type="button">
                  Cancel
                </Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};

export default AddAmbulanceFormDialog;
