import { z } from "zod";

export const schema = z.object({
  name: z.string().min(1, "Name is required"),
  snippet: z
    .string()
    .min(1, "Snippet is required")
    .max(800, "Maximum limit excedded"),
});
