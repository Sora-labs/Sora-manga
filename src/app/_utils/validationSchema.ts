import { z } from "zod";

export const fileSchema = z.instanceof(File, { message: "File is required" })
export const imageSchema = fileSchema.refine(file => file.type.startsWith("image/"), { message: "Image is required" })