import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "DELETE") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ message: "job id required" });
  }

  try {
    const deleteJob = await prisma.job.delete({
      where: {
        id: Number(id),
      },
    });

    return res.status(200).json({ job: deleteJob, message: "Job deleted" });
  } catch (error) {
    res.status(500).json(error);
  }
}
