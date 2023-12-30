import Song from "@/components/Song";
import { cn } from "@/lib/utils";

export interface Root {
  href: string;
  limit: number;
  next: string;
  offset: number;
  previous: string;
  total: number;
  items: Item[];
}

export interface TrackRoot {
  href: string;
  limit: number;
  next: string;
  offset: number;
  previous: string;
  total: number;
  items: TrackItem[];
}
export interface Item {
  album_type: string;
  total_tracks: number;
  available_markets: string[];
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  name: string;
  release_date: string;
  release_date_precision: string;
  restrictions: Restrictions;
  type: string;
  uri: string;
  artists: Artist[];
  album_group: string;
}

export interface TrackItem {
  artists: Artist[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_urls: ExternalUrls2;
  href: string;
  id: string;
  is_playable: boolean;
  linked_from: LinkedFrom;
  restrictions: Restrictions;
  name: string;
  preview_url: string;
  track_number: number;
  type: string;
  uri: string;
  is_local: boolean;
}

export interface Artist {
  external_urls: ExternalUrls;
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
}

export interface LinkedFrom {
  external_urls: ExternalUrls3;
  href: string;
  id: string;
  type: string;
  uri: string;
}

export interface ExternalUrls {
  spotify: string;
}

export interface Image {
  url: string;
  height: number;
  width: number;
}

export interface Restrictions {
  reason: string;
}

export interface Artist {
  external_urls: ExternalUrls2;
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
}

export interface ExternalUrls2 {
  spotify: string;
}

export interface ExternalUrls3 {
  spotify: string;
}

export interface Restrictions {
  reason: string;
}

export default async function Home() {
  console.log("Fetching token...");
  const token = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `grant_type=client_credentials&client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}`,
    next: { revalidate: 3600 },
  });
  const tokenResponse = await token.json();
  const tokenValue = tokenResponse.access_token;

  console.log("Fetching albums...");
  const albumList = await fetch(
    "https://api.spotify.com/v1/artists/06HL4z0CvFAxyc27GXpf02/albums?include_groups=album&limit=30",
    {
      headers: { Authorization: "Bearer " + tokenValue },
    }
  );
  const data: Root = await albumList.json();
  const albums = data.items
    .map((a) => ({
      id: a.id,
      name: a.name,
    }))
    .filter((a) => !a.name.includes("Deluxe"))
    .filter((a) => !a.name.includes("deluxe"))
    .filter((a) => !a.name.includes("Clear Channel"))
    .filter((a) => !a.name.includes("From The Vault"))
    .filter((a) => !a.name.includes("Platin"))
    .filter((a) => !a.name.includes("International"))
    .filter((a) => !a.name.includes("Edition"))
    .filter((a) => !a.name.includes("Remix"))
    .filter((a) => !a.name.includes("Acoustic"))
    .filter((a) => a.name != "1989")
    .filter((a) => a.name != "Speak Now")
    .filter((a) => a.name != "Red")
    .filter((a) => !a.name.includes("Tour"));

  console.log("Fetching tracks...");
  const albumsWithTracks: Array<{
    id: string;
    name: string;
    tracks: {
      id: string;
      name: string;
    }[];
  }> = await Promise.all(
    albums.map(async (album) => {
      const tracks = await fetch(
        `https://api.spotify.com/v1/albums/${album.id}/tracks`,
        {
          headers: {
            Authorization: "Bearer " + tokenValue,
          },
        }
      );
      const data: TrackRoot = await tracks.json();
      return {
        ...album,
        tracks: data.items.map((track) => ({ id: track.id, name: track.name })),
      };
    })
  );

  return (
    <div className="p-4 text-center">
      <h1 className="font-bold text-2xl">Taylor Swift Album Tracker</h1>
      <ul className="">
        {albumsWithTracks.map((a) => (
          <li className="py-4" key={a.name}>
            <p
              className={cn(
                "text-xl font-bold",
                a.name === "1989 (Taylor's Version)" &&
                  "font-nineteeneightynine",
                a.name.includes("Fearless") && "font-fearless uppercase",
                a.name.includes("Red") && "font-red uppercase",
                a.name.includes("reputation") && "font-reputation text-2xl",
                a.name.includes("Lover") && "font-lover text-2xl",
                a.name.includes("folklore") && "font-folkmore italic",
                a.name.includes("evermore") && "font-folkmore italic",
                a.name.includes("Speak") && "font-speaknow text-2xl",
                a.name.includes("Midnights") && "font-midnights",
                a.name.includes("Taylor Swift") && "font-debut text-2xl"
              )}
            >
              {a.name}
            </p>
            <ul>
              {a.tracks.map((track) => (
                <Song key={track.id} id={track.id} name={track.name} />
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}
