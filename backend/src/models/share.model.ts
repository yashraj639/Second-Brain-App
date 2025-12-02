import { z } from "zod";

export const shareSchema = z.object({
  body: z.object({
    share: z.boolean()
  })
});
