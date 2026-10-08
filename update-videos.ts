import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const videos = await prisma.video.findMany();
  const validIds = ["Yxk1XwXhWJU", "V9J_bL3_Y04", "v7AYKMP6rOE"];
  for (let i = 0; i < videos.length; i++) {
    await prisma.video.update({
      where: { id: videos[i].id },
      data: {
        youtubeVideoId: validIds[i % validIds.length],
        thumbnailUrl: `https://img.youtube.com/vi/${validIds[i % validIds.length]}/hqdefault.jpg`,
      }
    });
  }
}

main().then(() => console.log("Done"));
