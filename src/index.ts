import express from "express";
import cors from "cors";

// @ts-ignore
import videosRouter from "./routes/videos.ts";


//INITIALIZE APP
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//ROUTES

app.use("/api/videos", videosRouter);


//PORT
const PORT = process.env.PORT || 5020;

app.listen(PORT, () =>  console.log(`Connection is established and running on port ${PORT}.`))






