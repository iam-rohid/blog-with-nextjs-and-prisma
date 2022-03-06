import { NextApiRequest, NextApiResponse } from "next";
import { prismaClient } from "../../../lib/prismaClient";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { slug } = req.query;
  console.log({ slug });
  try {
    const article = await prismaClient.article.findUnique({
      where: { slug: typeof slug === "string" ? slug : slug[0] },
    });
    res.json(article);
  } catch (e) {
    res.status(500).json(e);
  }
}
