import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ message: "user id required" });
  }

  try {
    const jobs = await prisma.job.findMany({
      where: {
        userId: Number(userId),
      },
    });

    if (!jobs || jobs.length === 0) {
      return res.status(404).json({ message: "No jobs found" });
    }

    return res.status(200).json({ data: jobs, message: "jobs fetched" });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
}
