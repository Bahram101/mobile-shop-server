import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from './routes/productRoutes.js'
import categoryRoutes from './routes/categoryRoutes.js'

const app = express();
dotenv.config();

//constants
const PORT = process.env.PORT || 5555;

//middleware
app.use(cors());
app.use(express.json());

//routes
app.use("/api/auth", userRoutes); 
app.use("/api/product", productRoutes)
app.use("/api/category", categoryRoutes)


const start = async () => {
  try {
    await mongoose.connect(process.env.DB_URL).then(() => {
      console.log("DB is ok");
    });
    app.listen(PORT, () => console.log("Server is running!"));
  } catch (err) {
    console.log("error2", err);
  }
};

start();
