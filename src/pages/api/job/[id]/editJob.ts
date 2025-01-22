import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "PUT") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ message: "job id required" });
  }

  try {
    const { companyName, position, applicationDate, status } = req.body;

    if (!companyName || !position || !applicationDate || !status) {
      return res.json({ error: "all values are neeeded" });
    }

    const updateJob = await prisma.job.update({
      where: {
        id: Number(id),
      },
      data: {
        companyName: companyName,
        applicationDate: new Date(applicationDate),
        position: position,
        status: status,
      },
    });

    return res.status(200).json({ job: updateJob, message: "Job updated" });
  } catch (error) {
    res.status(500).json(error);
  }
}
