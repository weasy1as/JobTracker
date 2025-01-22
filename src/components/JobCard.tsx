import React from "react";

type Job = {
  name: string;
  companyName: string;
  position: string;
  applicationDate: string;
  status: string;
};

const JobCard = ({ header, jobs }: { header: string; jobs: Job[] }) => {
  return (
    <div className="w-auto h-auto border-2 border-black p-4">
      <h2>{header} </h2>
      <div className="flex flex-col gap-3 border-2 border-black">
        {jobs.map((job, index) => (
          <div key={index} className="border-2 border-black p-2">
            <p>{job.companyName}</p>
            <p>{job.position}</p>
            <p>{job.status}</p>
            <p>{job.applicationDate}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobCard;
