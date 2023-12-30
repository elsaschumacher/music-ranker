"use server";

import { createRating } from "@/lib/db/rating";

export async function rateSong(songId: string, rating: number) {
  await createRating(songId, rating);
}
