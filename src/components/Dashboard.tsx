"use client";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import JobCard from "./JobCard";

const Dashboard = () => {
  const { data: session } = useSession();
  const [jobs, setJobs] = useState([]);

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

        <p className="mt-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          Total jobs applied: {jobs.length}
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
