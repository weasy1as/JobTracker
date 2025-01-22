"use client";
import Job from "@/components/Job";
import { useParams } from "next/navigation";
import React from "react";

const page = () => {
  const { id } = useParams();
  return <Job jobId={id} />;
};

export default page;
