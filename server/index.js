import express from "express";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import authRoutes from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.use("/api/v1/auth", authRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
// import { main } from "./Services/ai.service.js";
// main();
import { resume } from "./Services/temp.js";
import { jobDescription } from "./Services/temp.js";
import { selfDescription } from "./Services/temp.js";
import generateInterviewReport from "./Services/ai.service.js";
generateInterviewReport({ jobDescription, resume, selfDescription });

