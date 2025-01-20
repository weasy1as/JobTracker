"use client";
import { useSession } from "next-auth/react";
import React from "react";
import Navbar from "./Navbar";

const Dashboard = () => {
  const { data: session } = useSession();
  return (
    <div>
      <Navbar />
      <div>
        Dashboard
        <p>{session?.user?.name}</p>
      </div>
    </div>
  );
};

export default Dashboard;
