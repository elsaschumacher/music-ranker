import { Schema, model, models } from "mongoose";

const ratingSchema = new Schema({
  songId: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
});

export const Rating = models.Rating ?? model("Rating", ratingSchema);
