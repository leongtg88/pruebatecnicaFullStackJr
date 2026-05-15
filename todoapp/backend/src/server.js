import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import { errorHandler } from "./utils/errorHandler.js";

dotenv.config();

const app = express();

// Conectar a la base de datos
connectDB();

app.use(cors());
app.use(express.json());

// Rutas
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

// Ruta de prueba
app.get("/", (req, res) => {
  res.json({ message: "API funcionando" });
});

// Middleware de manejo de errores (debe ir al final)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});