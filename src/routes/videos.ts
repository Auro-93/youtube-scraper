import express from "express";
// @ts-ignore
import { getVideo } from "../controllers/getVideo.ts";


const router = express.Router();

router.route("/:video").get(getVideo);


export default router;