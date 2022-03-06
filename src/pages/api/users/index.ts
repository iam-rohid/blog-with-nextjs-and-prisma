import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    res.json({
      message: "users",
    });
  } catch (e) {
    res.status(500).json(e);
  }
}
