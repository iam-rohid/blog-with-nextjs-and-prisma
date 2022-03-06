import { NextApiRequest, NextApiResponse } from "next";
import { prismaClient } from "../../../lib/prismaClient";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  console.log({ id });
  try {
    const result = await prismaClient.user.findUnique({
      where: { id: typeof id === "string" ? id : id[0] },
    });
    res.json(result);
  } catch (e) {
    res.status(500).json(e);
  }
}
