import { z } from "zod";

export const messageSchema = z.object({
  id: z.string(),
  content: z.string(),
  role: z.enum(["user", "assistant"]),
});
export type Message = z.infer<typeof messageSchema>;