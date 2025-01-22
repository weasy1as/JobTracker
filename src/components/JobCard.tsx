import { useRouter } from "next/navigation";
import React from "react";

type Job = {
  name: string;
  companyName: string;
  position: string;
  applicationDate: string;
  status: string;
};

const JobCard = ({ header, jobs }: { header: string; jobs: Job[] }) => {
  const router = useRouter();

  const handleJobClick = (id: number) => {
    router.push(`/job/${id}`);
  };

  return (
    <div className="w-[300px] h-auto bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-lg font-bold mb-4 text-gray-700">{header}</h2>
      {jobs.length === 0 ? (
        <p className="text-gray-500 italic">No jobs</p>
      ) : (
        <div className="flex flex-col gap-4">
          {jobs.map((job, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-md p-4 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => handleJobClick(job.id)}
            >
              <p className="text-sm text-gray-600">
                <strong className="text-gray-800">Company:</strong>{" "}
                {job.companyName}
              </p>
              <p className="text-sm text-gray-600">
                <strong className="text-gray-800">Position:</strong>{" "}
                {job.position}
              </p>
              <p className="text-sm text-gray-600">
                <strong className="text-gray-800">Applied on:</strong>{" "}
                {new Date(job.applicationDate).toDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default JobCard;
