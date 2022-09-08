// @ts-ignore
import { z } from "https://deno.land/x/zod/mod.ts";

const VideoParamSchema = z.string().min(1);

export type VideoParam = z.infer<typeof VideoParamSchema>;