import { Rating } from "../models/Rating";
import { connectDB } from "./connect";

export async function createRating(songId: string, rating: number) {
  try {
    await connectDB();

    const newRating = new Rating({ songId, rating });
    const result = await newRating.save();

    return {
      rating: result,
    };
  } catch (error) {
    return { error };
  }
}
