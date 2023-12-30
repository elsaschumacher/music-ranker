"use server";

import { createRating } from "@/lib/db/rating";
import { cookies } from "next/headers";

export async function rateSong(songId: string, rating: number) {
  const userId = cookies().get("userId")!.value;

  await createRating(songId, rating, userId);
}
