import express from "express";
import mongoose from 'mongoose';
import dotenv from 'dotenv'


const app = express();
dotenv.config()

app.get('/', (req, res) => {
  res.send('Hello world!')
})

const start = async () => {
  try {
    await mongoose.connect(process.env.DB_URL)
      .then(() => console.log('DB is ok'))
      .catch(() => console.log('DB error'))

    app.listen(4444, () => {
      console.log("Server is running!");
    });
  } catch (err) {
    console.log('eeee', error)
  }
};

start();
