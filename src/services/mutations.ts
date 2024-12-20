import { useMutation, useQueryClient } from "@tanstack/react-query";
import FormData from "form-data";
import {
  addAmbulanceDetails,
  addDoctorDetails,
  deleteFile,
  removeAmbulance,
  removeDoctor,
  updateAmbulanceDetails,
  updateDoctorDetails,
  uploadFile,
} from "./api";

export function useAddDoctor() {
  return useMutation({
    mutationFn: (doctor: any) => addDoctorDetails(doctor),
  });
}

export function useUpdateDoctor() {
  return useMutation({
    mutationFn: (doctor: any) => updateDoctorDetails(doctor),
  });
}

export function useDeleteDoctor() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => removeDoctor(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["doctors"] });
    },
  });
}

export function useAddAmbulance() {
  return useMutation({
    mutationFn: (ambulance: any) => addAmbulanceDetails(ambulance),
  });
}

export function useUpdateAmbulance() {
  return useMutation({
    mutationFn: (ambulance: any) =>
      updateAmbulanceDetails(ambulance.id, ambulance),
  });
}

export function useDeleteAmbulance() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => removeAmbulance(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ambulances"] });
    },
  });
}

export function useUploadFile() {
  return useMutation({
    mutationFn: (formData: any) => {
      return uploadFile(formData);
    },
  });
}

export function useDeleteFile(fileKey: string) {
  return useMutation({
    mutationKey: ["files"],
    mutationFn: () => deleteFile(fileKey),
  });
}
