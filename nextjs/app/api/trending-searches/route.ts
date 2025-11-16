// route that returns treanding searches :

import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { startOfDay } from "date-fns";
import Yt from "ytmusic-api";
//  for later
export async function GET(req: NextRequest) {
  try {
    const res = await prisma.trendingSearch.findMany({
      where: {
        created: {
          gte: startOfDay(new Date()),
        },
      },
      orderBy: {
        searches: "desc",
      },
      take: 25,
    });
    const yt = new Yt();
    await yt.initialize();
    const songs = await Promise.all(
      res.map(async (item) => yt.getSong(item.videoId))
    );
    return NextResponse.json(songs, { status: 200 });
  } catch (error) {
    console.error(error, "error");
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT (req: NextRequest){}
