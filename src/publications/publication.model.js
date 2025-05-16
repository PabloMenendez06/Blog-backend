import { Schema, model } from "mongoose";

const PublicationSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      maxLength: [100, "Must not exceed 100 characters"],
      minLength: [5, "Minimum 5 characters required"],
      trim: true,
    },
    text: {
      type: String,
      required: [true, "Text is required"],
      maxLength: [6000, "Must not exceed 5000 characters"],
      minLength: [10, "Minimum 10 characters required"],
      trim: true,
    },
    user: {
      type: String,
      required: [true, "Author name is required"],
      trim: true,
      minLength: [3, "Name must be at least 3 characters long"],
      maxLength: [150, "Name must not exceed 100 characters"]
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Category is required"],
    },
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    status: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("Publication", PublicationSchema);
