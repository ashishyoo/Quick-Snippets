import { z } from "zod";

export const formSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  snippet: z
    .string()
    .trim()
    .min(1, "Snippet is required")
    .max(800, "Maximum limit excedded"),
});
