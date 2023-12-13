export interface Root {
  href: string;
  limit: number;
  next: string;
  offset: number;
  previous: string;
  total: number;
  items: Item[];
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

export default async function Home() {
  const token = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `grant_type=client_credentials&client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}`,
  });
  const spotifyData = await fetch(
    "https://api.spotify.com/v1/artists/06HL4z0CvFAxyc27GXpf02/albums?include_groups=album&limit=30",
    {
      headers: { Authorization: "Bearer " + (await token.json()).access_token },
    }
  );
  const data: Root = await spotifyData.json();
  const albums = data.items
    .map((a) => a.name)
    .filter((a) => !a.includes("Deluxe"))
    .filter((a) => !a.includes("deluxe"))
    .filter((a) => !a.includes("Clear Channel"))
    .filter((a) => !a.includes("From The Vault"))
    .filter((a) => !a.includes("Platin"))
    .filter((a) => !a.includes("International"))
    .filter((a) => !a.includes("Edition"))
    .filter((a) => !a.includes("Remix"))
    .filter((a) => !a.includes("Acoustic"))
    .filter((a) => a != "1989")
    .filter((a) => a != "Speak Now")
    .filter((a) => a != "Red")
    .filter((a) => !a.includes("Tour"));
  console.log(data);

  return <div>{albums}</div>;
}
