import { cn } from "@/lib/utils";
import Song from "./Song";
import { RatingSchema } from "@/lib/models/Rating";
import { conn } from "@/lib/db/connect";
import { cookies } from "next/headers";
import { unstable_cache } from "next/cache";

export const getRating = (albumId: string) =>
  unstable_cache(
    async (userId: string, songIds: string[]) => {
      const possibleIds = "(" + songIds.map((id) => `'${id}'`).join(", ") + ")";
      const items = (
        await conn.execute(
          `select * from ratings where userId = ? and songId in ${possibleIds};`,
          [userId]
        )
      ).rows;

      return items as RatingSchema[];
    },
    ["album-ratings"],
    { tags: ["album-" + albumId] }
  );

export async function Album({
  album,
}: {
  album: {
    id: string;
    name: string;
    tracks: {
      id: string;
      name: string;
    }[];
  };
}) {
  const userId = cookies().get("userId")!.value;
  const ratings = await getRating(album.id)(
    userId,
    album.tracks.map((t) => t.id)
  );
  const favorite = ratings?.sort((a, b) => b.rating - a.rating)[0]?.songId;
  const leastFavorite = ratings?.sort((a, b) => a.rating - b.rating)[0]?.songId;
  return (
    <li className="py-4" key={album.name}>
      <p
        className={cn(
          "text-xl font-bold",
          album.name === "1989 (Taylor's Version)" && "font-nineteeneightynine",
          album.name.includes("Fearless") && "font-fearless uppercase",
          album.name.includes("Red") && "font-red uppercase",
          album.name.includes("reputation") && "font-reputation text-2xl",
          album.name.includes("Lover") && "font-lover text-2xl",
          album.name.includes("folklore") && "font-folkmore italic",
          album.name.includes("evermore") && "font-folkmore italic",
          album.name.includes("Speak") && "font-speaknow text-2xl",
          album.name.includes("Midnights") && "font-midnights",
          album.name.includes("Taylor Swift") && "font-debut text-2xl"
        )}
      >
        {album.name}
      </p>
      <div>
        <p className="text-lg font-semibold">Statistics</p>
        {ratings.length === 0 ? (
          <p>No ratings yet</p>
        ) : (
          <>
            <p>
              Your favorite song is{" "}
              {album.tracks.find((track) => track.id === favorite)?.name}
            </p>
            <p>
              Your least favorite song is{" "}
              {album.tracks.find((track) => track.id === leastFavorite)?.name}
            </p>
            <p>
              Average rating:{" "}
              {(
                ratings.reduce((accumulator, currentValue) => {
                  return accumulator + currentValue.rating;
                }, 0) / ratings.length
              ).toLocaleString("en", { maximumFractionDigits: 2 })}{" "}
              ☆
            </p>
          </>
        )}
      </div>
      <ul className="divide-y">
        {album.tracks.map((track) => (
          <Song
            key={track.id}
            id={track.id}
            name={track.name}
            albumId={album.id}
          />
        ))}
      </ul>
    </li>
  );
}
