import { connectDB } from "@/lib/db/connect";
import SongRating from "./SongRating";
import { Rating } from "@/lib/models/Rating";
import { cookies } from "next/headers";

export default async function Song({ name, id }: { id: string; name: string }) {
  const userId = cookies().get("userId")!.value;
  await connectDB();
  const rating = await Rating.findOne({ userId, songId: id });

  return (
    <li className="flex items-center">
      <span>{name}</span>
      <SongRating id={id} previousRating={rating?.rating ?? 0}></SongRating>
    </li>
  );
}
