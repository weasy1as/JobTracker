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

        const response = await fetch(`api/job/${userId}/getJobs`);

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

  return (
    <div>
      <Navbar />
      <div className="flex flex-col justify-between items-center">
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          Dashboard
        </h1>
        <p>Welcome back {session?.user?.name}</p>
        <div className="flex gap-4 my-4">
          <JobCard header="Applied" jobs={jobs} />
          <JobCard header="Interview" jobs={jobs} />
          <JobCard header="Offer" jobs={jobs} />
          <JobCard header="Rejected" jobs={jobs} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
