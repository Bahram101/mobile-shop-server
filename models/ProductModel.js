import { Schema, model } from "mongoose";

const ProductSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    availability: {
      type: Boolean,
      required: false,
    },
    categoryId: {
      type: Schema.ObjectId,
      ref: "Category",
    },
    image: {
      type: String,
      required: true,
      default:
        "https://img.freepik.com/free-vector/smartphone-cartoon_78370-590.jpg?w=740&t=st=1716205026~exp=1716205626~hmac=d514ec9889a7c40481421379ef067469a4c6e2ea8cf2302d391c93f11545cc79",
    },
    author: {
      type: Schema.ObjectId,
      ref: "User",
    },
    views: {
      type: Number,
      default: 0,
    },
    isExist:{
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

export default model("Product", ProductSchema);
