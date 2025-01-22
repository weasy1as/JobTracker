import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ message: "user id required" });
  }

  try {
    const job = await prisma.job.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!job) {
      return res.status(404).json({ message: "No jobs found" });
    }

    return res.status(200).json({ data: job, message: "jobs fetched" });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
}
