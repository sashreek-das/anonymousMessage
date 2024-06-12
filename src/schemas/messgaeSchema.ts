import { z } from "zod";

export const messageSchema=z.object({
    content:z
    .string()
    .min(10,{message:" message should be of minimum 10 characters"})
    .max(300, {message:"message cannot be more than 300 words"})
})