import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

export async function GET(
  req: NextRequest,
  { params }: { params: { clerkId: string } }
) {
  try {
    const { clerkId } = params;
    const favourites = await prisma.mySong.findMany({
      where: {
        user: {
          clerkId,
        },
      },
      select: {
        song: true,
      },
    });
    return NextResponse.json(favourites, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const request = await req.json();
    const { success, data } = z
      .object({
        clerkId: z.string(),
        songId: z.string(),
      })
      .safeParse(request);
    if (!success) {
      return NextResponse.json({ error: "Invalid data" }, { status: 400 });
    }
    await prisma.mySong.updateMany({
      where: {
        AND: [
          {
            user: {
              clerkId: data.clerkId,
            },
          },
          {
            songId: data.songId,
          },
        ],
      },
      data: {
        favourite: true,
      },
    });
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server errror" },
      { status: 500 }
    );
  }
}
