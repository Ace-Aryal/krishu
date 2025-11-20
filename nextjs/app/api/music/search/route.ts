import { NextRequest, NextResponse } from "next/server";
import Yt from "ytmusic-api";
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") || "";
    const yt = new Yt();
    await yt.initialize();
    const songs = await yt.searchSongs(search);
    return NextResponse.json(songs, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
