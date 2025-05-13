import { Schema, model } from "mongoose";

const CommentSchema = new Schema(
  {
    comment: {
      type: String,
      required: [true, "Comment is required"],
      maxLength: [700, "Must not exceed 500 characters"],
      minLength: [3, "Minimum 3 characters required"],
      trim: true,
    },
    user: {
      type: String,
      default: "Anonymous",
      trim: true,
    },
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

export default model("Comment", CommentSchema);
