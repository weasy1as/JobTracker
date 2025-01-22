"use client";
import Job from "@/components/Job";
import { useParams } from "next/navigation";
import React from "react";

const page = () => {
  const params = useParams();
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id; // Handle possible array case

  return <Job jobId={Number(id)} />;
};

export default page;
