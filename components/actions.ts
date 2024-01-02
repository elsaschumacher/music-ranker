"use server";

import { createRating } from "@/lib/db/rating";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export async function rateSong(
  songId: string,
  rating: number,
  albumId: string
) {
  const userId = cookies().get("userId")!.value;

  await createRating(songId, rating, userId);
  revalidateTag("album-" + albumId);
}
