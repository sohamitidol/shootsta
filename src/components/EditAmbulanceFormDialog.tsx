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
import { useUpdateAmbulance } from "@/services/mutations";
import { useAmbulanceById } from "@/services/queries";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { MessageCircleWarningIcon } from "lucide-react";
import { useRef } from "react";
import { FormProvider, useForm } from "react-hook-form"; // Import FormProvider
import { z } from "zod";
import FileInput from "./FileInput"; // Assuming FileInput is in the same directory
import { LoadingSpinner } from "./LoadingSpinner";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

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
  id: number;
};

const EditAmbulanceFormDialog = ({ open, setOpen, id }: Props) => {
  const methods = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const {
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = methods;

  const { data, isPending, isError } = useAmbulanceById(id);
  const updateDoctorMutation = useUpdateAmbulance();

  const value = useRef("");
  const queryClient = useQueryClient();
  console.log("data", data);

  const onSubmit = (data: FormData) => {
    setTimeout(() => {
      const model = {
        ...data,
        id: id,
        imageFileKey: data.imageFileKey ? data.imageFileKey : value.current,
      };

      updateDoctorMutation.mutate(model, {
        onSuccess: () => {
          toast({
            title: "Ambulance details updated successfully",
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
    });
  };
  setValue("title", data?.title || "");
  setValue("contact", data?.contact ?? "");
  setValue("description", data?.description ?? "");
  setValue("location", data?.location ?? "");
  setValue("imageFileKey", data?.imageFileKey ?? "");

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="shadow-lg rounded-lg max-w-lg w-full p-6 opacity-100">
        <DialogTitle>
          <h2>Edit Ambulance</h2>
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
                value={data?.imageFileKey}
              />
              {/* {errors.file && (
								<p className="text-red-600 text-xs">File is required</p>
							)} */}
            </div>

            <DialogFooter className="flex items-center ">
              {isPending ? <LoadingSpinner /> : null}
              {isError ? (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <MessageCircleWarningIcon />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Error loading data...</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ) : null}
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

export default EditAmbulanceFormDialog;
