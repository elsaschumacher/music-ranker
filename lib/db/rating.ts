import { conn } from "./connect";

export async function createRating(
  songId: string,
  rating: number,
  userId: string
) {
  try {
    console.log("Inserting or updating...");
    const result = await conn.execute(
      "insert into ratings(songId, userId, rating) values (:songId, :userId, :rating) on duplicate key update rating = :rating;",
      { songId, userId, rating }
    );

    return {
      ratingId: result.insertId,
    };
  } catch (error) {
    console.error(error);
    return { error };
  }
}
