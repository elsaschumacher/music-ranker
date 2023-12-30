import { Rating } from "../models/Rating";
import { connectDB } from "./connect";

export async function createRating(
  songId: string,
  rating: number,
  userId: string
) {
  try {
    await connectDB();

    const newRating = { songId, rating, userId };
    console.log("Inserting or updating...", newRating);
    const result = await Rating.updateOne({ userId, songId }, newRating, {
      new: true,
      upsert: true,
      setDefaultsOnInsert: true,
    });
    console.log(result);

    return {
      rating: result,
    };
  } catch (error) {
    console.error(error);
    return { error };
  }
}
