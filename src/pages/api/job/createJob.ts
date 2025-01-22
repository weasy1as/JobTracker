import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { userId, companyName, position, applicationDate } = await req.body;

    if (!userId || !companyName || !position || !applicationDate) {
      return res.json({ error: "all values are neeeded" });
    }

    const newJob = await prisma.job.create({
      data: {
        userId,
        companyName,
        applicationDate: new Date(applicationDate),
        position,
      },
    });

    return res.status(201).json({ job: newJob, message: "Job created" });
  } catch (error) {
    res.status(500).json(error);
  }
}
