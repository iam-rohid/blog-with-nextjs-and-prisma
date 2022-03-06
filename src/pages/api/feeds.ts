import { NextApiRequest, NextApiResponse } from "next";
import { prismaClient } from "../../lib/prismaClient";
import { Feed } from "../../types/Feed";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    let featuredArticles = await prismaClient.article.findMany({
      where: {
        stage: "Published",
        isFeatured: true,
      },
      select: {
        id: true,
        slug: true,
        title: true,
        excerpt: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: {
        updatedAt: "desc",
      },
      take: 2,
    });
    let popularArticles = await prismaClient.article.findMany({
      where: {
        stage: "Published",
      },
      select: {
        id: true,
        slug: true,
        title: true,
        excerpt: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 10,
    });
    let recentArticles = await prismaClient.article.findMany({
      where: {
        stage: "Published",
      },
      select: {
        id: true,
        slug: true,
        title: true,
        excerpt: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 10,
    });

    featuredArticles = JSON.parse(JSON.stringify(featuredArticles));
    popularArticles = JSON.parse(JSON.stringify(popularArticles));
    recentArticles = JSON.parse(JSON.stringify(recentArticles));

    const result: Feed = {
      sections: [
        {
          id: "featured",
          title: "Featured",
          type: "list",
          articles: featuredArticles,
        },
        {
          id: "recent",
          title: "Recent",
          type: "list",
          articles: recentArticles,
        },
        {
          id: "popular",
          title: "Popular",
          type: "list",
          articles: popularArticles,
        },
      ],
    };

    res.json(result);
  } catch (e) {
    res.status(500).json(e);
  }
}
