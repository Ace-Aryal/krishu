import { NextRequest } from "next/server";
import YT from "ytmusic-api";
const yt = new YT();
export async function GET(req: NextRequest) {
  try {
    await yt.initialize();
    const videos = await yt.searchSongs("pop songs");
    console.log(videos, "videos");
    return new Response(JSON.stringify(videos), { status: 200 });
  } catch (error) {
    console.error(error, "error");
    return new Response(JSON.stringify(error), { status: 500 });
  }
}
