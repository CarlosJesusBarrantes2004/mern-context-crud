import express from "express";
import cors from "cors";
import morgan from "morgan";
import postsRoutes from "./routes/posts.routes.js";
import fileUpload from "express-fileupload";
import { connectDB } from "./db.js";

connectDB();

const app = express();

//middlewares
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(morgan("dev"));
app.use(express.json());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "./upload",
  })
);
app.use("/api", postsRoutes);

app.use((err, req, res, next) => {
  return res.status(500).json({ error: err.message });
});

app.use((req, res, next) =>
  res.status(404).json({ message: "Endpoint not found." })
);

export default app;
