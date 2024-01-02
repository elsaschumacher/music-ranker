import { conn } from "@/lib/db/connect";
import SongRating from "./SongRating";
import { cookies } from "next/headers";
import { RatingSchema } from "@/lib/models/Rating";

export default async function Song({
  name,
  id,
  albumId,
}: {
  id: string;
  name: string;
  albumId: string;
}) {
  const userId = cookies().get("userId")!.value;
  const rating = (
    await conn.execute(
      "select * from ratings where userId = ? and songId = ? limit 1",
      [userId, id]
    )
  ).rows.at(0) as RatingSchema | undefined;

  return (
    <li className="flex items-center justify-between py-1 even:bg-gray-100 px-1">
      <span>{name}</span>
      <SongRating
        id={id}
        previousRating={rating?.rating ?? 0}
        albumId={albumId}
      ></SongRating>
    </li>
  );
}
