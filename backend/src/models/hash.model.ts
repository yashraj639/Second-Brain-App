import z from "zod";

export const hashSchema = z.object({
  params: z.object({
    hash: z.string().min(6).max(12)
  })
});
