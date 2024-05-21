import { Schema, model } from "mongoose";

const CategorySchema = Schema(
  {
    name: {
      type: String,
      required: true,
    },
    parent: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      default:null
    },
    // children: [
    //   {
    //     type: Schema.Types.ObjectId,
    //     ref: "Category",
    //   },
    // ],
  },
  { timestamps: true }
);

export default model("Category", CategorySchema);
