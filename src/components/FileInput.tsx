import { Input } from "@/components/ui/input"; // Assuming you have a basic Input component
import { useUploadFile } from "@/services/mutations";
import FormData from "form-data";
import { useFormContext } from "react-hook-form";

type FileInputProps = {
  id: string;
  name: string;
  label: string;
  value?: string;
  required?: boolean;
  setUpload?: any;
  upload?: any;
};

const FileInput = ({ id, label, value, setUpload }: FileInputProps) => {
  const { setValue } = useFormContext();
  const fileUploadMutation = useUploadFile();

  // Handle file change
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    const formData = new FormData();
    formData.append("file", file);

    fileUploadMutation.mutate(formData, {
      onSuccess: (data) => {
        console.log("File upload successful:", data);
        setValue("imageFileKey", data);
        setUpload(data);
      },
      onError: (error) => {
        console.error("File upload failed:", error);
      },
    });
  };

  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-sm font-medium">
        {label}
      </label>
      <Input
        id={id}
        type="file"
        onChange={handleFileChange}
        className="border p-2"
      />
      <div>
        {value && (
          <p className="text-sm text-gray-500 mt-2">File selected: {value}</p>
        )}
      </div>
    </div>
  );
};

export default FileInput;
