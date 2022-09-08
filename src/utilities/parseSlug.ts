import { VideoParam } from "../models/videoParamSchema";
import slugify from "slugify";

export const parseSlug = (slug: VideoParam) => {
    const slugifyParam = slugify(slug, "-");
   return slugifyParam.split("-").join(" ")
}