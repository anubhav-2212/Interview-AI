import express from "express";
import { registerUserController, loginUserController, logoutUserController, getMeController } from "../controllers/auth.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const authRoutes = express.Router();

authRoutes.post("/register", registerUserController);
authRoutes.post("/login", loginUserController);
authRoutes.post("/logout",authMiddleware, logoutUserController);
authRoutes.get("/me", authMiddleware, getMeController);


export default authRoutes;