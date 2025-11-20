import ytdl from "@distube/ytdl-core";
import { NextRequest, NextResponse } from "next/server";
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const videoId = searchParams.get("videoId") || "";
    if (!videoId)
      return NextResponse.json(
        { error: "VideoId is required" },
        { status: 400 }
      );
    // const yt = new Yt();
    // await yt.initialize();
    // const songStream = await yt.getSong(song);

    const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
    const info = await ytdl.getInfo(videoUrl);

    const audioFormat = ytdl.chooseFormat(info.formats, {
      quality: "lowestaudio",
    });

    return NextResponse.json(audioFormat.url, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
