import express from "express";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import authRoutes from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import interviewRouter from "./routes/interview.routes.js";
import cors from "cors";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));


app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/interview", interviewRouter);


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

