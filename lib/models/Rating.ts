import { Schema, model, models, type ObjectId } from "mongoose";

const ratingSchema = new Schema({
  songId: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
});

export const Rating = models.Rating ?? model("Rating", ratingSchema);

export type RatingSchema = {
  _id: ObjectId;
  songId: string;
  userId: string;
  __v: number;
  rating: number;
};
