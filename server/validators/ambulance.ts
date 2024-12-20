import { z } from "zod";

export const addAmbulanceValidator = z.object({
  title: z
    .string({ message: "title is required" })
    .min(2, "title must be of at least 2 characters"),
  contact: z.string().optional(),
  description: z.string().optional(),
  location: z.string().optional(),
  imageFileKey: z.string().optional(),
});

export const updateAmbulanceValidator = z.object({
  title: z
    .string({ message: "title is required" })
    .min(2, "title must be of at least 2 characters")
    .optional(),
  contact: z.string().optional(),
  description: z.string().optional(),
  location: z.string().optional(),
  imageFileKey: z.string().optional(),
});

export type AddAmbulance = z.infer<typeof addAmbulanceValidator>;

export type UpdateAmbulance = z.infer<typeof updateAmbulanceValidator>;
