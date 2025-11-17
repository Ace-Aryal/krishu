// route that returns treanding searches :

import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { startOfDay } from "date-fns";
import Yt from "ytmusic-api";
import z from "zod";
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

export async function PUT(req: NextRequest) {
  try {
    const res = await req.json();
    const { success, data, error } = z
      .object({
        search: z.string().min(3, "Minimum search length is 3 characters"),
      })
      .safeParse(res);
    if (!success) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    const yt = new Yt();
    await yt.initialize();
    const songs = await yt.searchSongs(data.search);
    const search = await prisma.trendingSearch.findFirst({
      where: {
        AND: [
          {
            search: data.search,
          },
          {
            created: {
              gte: startOfDay(new Date()),
            },
          },
        ],
      },
    });
    if (search?.id) {
      await prisma.trendingSearch.update({
        where: {
          id: search.id,
        },
        data: {
          searches: { increment: 1 },
        },
      });
      return;
    }
    await prisma.trendingSearch.create({
      data: {
        created: new Date(),
        search: data.search,
        searches: 1,
        videoId: songs[0].videoId,
      },
    });
  } catch (error) {}
}
