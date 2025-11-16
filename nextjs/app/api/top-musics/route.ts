import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import YT from "ytmusic-api";
import { z } from "zod";

const yt = new YT();

// -----------------------------
// GET: Fetch top musics for a user
// -----------------------------
// -----------------------------
// GET: Fetch top musics for a user OR public songs
// -----------------------------
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const take = Number(searchParams.get("take")) || 50;
    const clerkId = searchParams.get("clerkId");

    let songs;

    if (clerkId) {
      // Fetch user's top musics
      songs = await getUserTopMusics(clerkId, take);
    } else {
      // Fetch public songs if no clerkId
      songs = await getPublicTopMusics(take);
    }

    const videos = await fetchYouTubeSongs(
      songs.map((item) => item.song.videoId)
    );

    return NextResponse.json(videos, { status: 200 });
  } catch (error) {
    console.error("GET /api/my-top-musics error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// -----------------------------
// Helper function to fetch public top musics
// -----------------------------
async function getPublicTopMusics(take: number) {
  return prisma.publicSong.findMany({
    select: {
      clicked: true, // equivalent to `favourite` in mySong
      song: {
        select: {
          videoId: true,
        },
      },
    },
    orderBy: { clicked: "desc" },
    take,
  });
}

// -----------------------------
// PUT: Increment clicked count
// -----------------------------
export async function PUT(req: NextRequest) {
  try {
    const data = await req.json();

    const parseResult = z
      .object({
        videoId: z.string(),
        clerkId: z.string().optional(),
        artistId: z.string(),
        songIncrement: z.int().optional().default(1),
        artistIncrement: z.int().optional().default(1),
      })
      .safeParse(data);

    if (!parseResult.success) {
      return NextResponse.json({ error: "Invalid data" }, { status: 400 });
    }

    const { videoId, artistId, artistIncrement, songIncrement } =
      parseResult.data;

    const song = await findSongByVideoId(videoId);
    if (!song) {
      return NextResponse.json({ error: "No song found" }, { status: 404 });
    }
    if (parseResult.data.clerkId) {
      const { clerkId } = parseResult.data;
      await Promise.all([
        incrementMySongClicked(song.id, clerkId, songIncrement),
        incrementPublicSongClicked(song.id),
        incrementMyArtistClicked(artistId, clerkId, artistIncrement),
      ]);
    } else {
      await incrementPublicSongClicked(song.id);
    }
    // Perform updates in parallel

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("PUT /api/my-top-musics error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// -----------------------------
// Helper Functions
// -----------------------------

// Fetch user's top musics
async function getUserTopMusics(clerkId: string, take: number) {
  return prisma.mySong.findMany({
    where: { user: { clerkId: clerkId } }, // <-- assuming `mySong` has a userId field
    select: {
      favourite: true,
      song: {
        select: {
          videoId: true,
        },
      },
    },
    orderBy: { clicked: "desc" },
    take,
  });
}

// Fetch YouTube song info
export async function fetchYouTubeSongs(videoIds: string[]) {
  await yt.initialize();
  return Promise.all(videoIds.map((id) => yt.getSong(id)));
}

// Find song by videoId
async function findSongByVideoId(videoId: string) {
  return prisma.song.findUnique({
    where: { videoId },
    select: { id: true },
  });
}

// Increment clicked count in mySong
async function incrementMySongClicked(
  songId: string,
  clerkId: string,
  increment: number = 1
) {
  const song = await prisma.mySong.findUnique({ where: { id: songId } });
  if (!song) {
    return prisma.mySong.create({
      data: {
        song: {
          connect: {
            videoId: songId,
          },
        },
        user: {
          connect: {
            clerkId,
          },
        },
        clicked: increment,
        favourite: false,
      },
    });
  }
  return prisma.mySong.update({
    where: {
      id: songId,
      user: {
        clerkId,
      },
    }, // <-- unique field required
    data: { clicked: { increment } },
  });
}

// Increment clicked count in publicSong
async function incrementPublicSongClicked(songId: string) {
  const song = await prisma.song.findUnique({ where: { id: songId } });
  if (!song) {
    return prisma.publicSong.create({
      data: {
        song: {
          connect: {
            videoId: songId,
          },
        },

        clicked: 1,
      },
    });
  }
  return prisma.publicSong.updateMany({
    where: { songId }, // <-- unique field required
    data: { clicked: { increment: 1 } },
  });
}

// Increment clicked count for user's artist
async function incrementMyArtistClicked(
  artistId: string,
  clerkId: string,
  increment = 1
) {
  const artist = await prisma.myArtist.findUnique({ where: { id: artistId } });
  if (!artist) {
    return prisma.myArtist.create({
      data: {
        artistId,
        clicked: increment,
        user: {
          connect: {
            clerkId,
          },
        },
      },
    });
  }
  return prisma.myArtist.updateMany({
    where: {
      id: artistId,
      user: {
        clerkId,
      },
    }, // <-- unique field required
    data: { clicked: { increment } },
  });
}
