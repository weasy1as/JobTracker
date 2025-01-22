"use client";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import JobCard from "./JobCard";

type Job = {
  id: number;
  companyName: string;
  position: string;
  applicationDate: string;
  status: string;
};

const Dashboard = () => {
  const { data: session } = useSession();
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const userId = await session?.user.id;
        console.log(userId);

        const response = await fetch(`api/jobs/${userId}/getJobs`);

        if (!response.ok) {
          return console.log("something went wrong");
        }

        const data = await response.json();
        setJobs(data.data);
        console.log(jobs);
        return jobs;
      } catch (error) {
        return console.log(error);
      }
    };
    fetchJobs();
  }, [session]);

  const appliedJobs = jobs.filter((job) => job.status === "applied");
  const interviewJobs = jobs.filter((job) => job.status === "interview");
  const offerJobs = jobs.filter((job) => job.status === "offer");
  const rejectedJobs = jobs.filter((job) => job.status === "rejected");

  return (
    <div>
      <Navbar />
      <div className="flex flex-col justify-between items-center">
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          Dashboard
        </h1>
        <p>Welcome back {session?.user?.name}</p>
        <div className="flex flex-wrap gap-4 my-4">
          <JobCard header="Applied" jobs={appliedJobs} />
          <JobCard header="Interview" jobs={interviewJobs} />
          <JobCard header="Offer" jobs={offerJobs} />
          <JobCard header="Rejected" jobs={rejectedJobs} />
        </div>
        <div className="flex flex-col text-center pb-4">
          <p className="mt-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
            Total jobs applied: {jobs.length}
          </p>
          <p className="w-auto h-auto bg-green-500 mt-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white">
            Total Offers: {offerJobs.length}
          </p>
          <p className="w-auto h-auto bg-yellow-500 mt-4 text-xl font-extrabold leading-none tracking-tight text-gray-900 md:text-xl lg:text-2xl dark:text-white">
            Total Interviews: {interviewJobs.length}
          </p>
          <p className="w-auto h-auto bg-red-500 my-4 text-xl font-extrabold leading-none tracking-tight text-gray-900 md:text-xl lg:text-2xl dark:text-white">
            Total Rejections: {rejectedJobs.length}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
