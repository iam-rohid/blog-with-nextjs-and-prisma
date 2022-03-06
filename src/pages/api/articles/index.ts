import { NextApiRequest, NextApiResponse } from "next";
import { prismaClient } from "../../../lib/prismaClient";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const articles = await prismaClient.article.findMany();
    res.json(articles);
  } else {
    res.status(500).json({
      message: "Only excepts GET Request",
    });
  }
}
