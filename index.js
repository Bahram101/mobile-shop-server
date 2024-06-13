import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import errorMiddleware from "./utils/errorMiddleware.js";

dotenv.config();
const app = express();

//constants
const PORT = process.env.PORT || 4444;

//middleware
app.use(cors());
app.use(express.json());

//routes
app.use("/api/auth", userRoutes);
app.use("/api/product", productRoutes);
app.use("/api/category", categoryRoutes);
app.use(errorMiddleware);

const start = async () => {
  try {
    await mongoose
      .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log("db is ok");
      });
    app.listen(PORT, () => console.log("Server is running!"));
  } catch (err) {
    console.log("error22", err);
  }
};

start();
