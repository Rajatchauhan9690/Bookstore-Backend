import mongoose, { Schema } from "mongoose";
const bookSchema = new Schema({
  name: String,
  price: Number,
  category: String,
  title: String,
  image: String,
});
export const Book = mongoose.model("Book", bookSchema);
