import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoute from './routes/auth.js'

const app = express();
dotenv.config();

//constants
const PORT = process.env.PORT || 5555;

//middleware
app.use(cors());
app.use(express.json());

//routes
app.use('/api/auth', authRoute)

app.get("/", (req, res) => {
  return res.json({ message: "Hello world!" });
  // return res.send("Hello world!");
});

const start = async () => {
  try {
    await mongoose.connect(process.env.DB_URL).then(() => {
      console.log("DB is OK");
    });

    app.listen(PORT, () => console.log("Server is running!"));
  } catch (err) {
    console.log("error2", err);
  }
};

start();
