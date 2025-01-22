"use client";

import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";

type Job = {
  id: string;
  companyName: string;
  position: string;
  applicationDate: string;
  status: string;
};

const Job = ({ jobId }: { jobId: number }) => {
  const [job, setJob] = useState<Job | null>(null);
  const [formData, setFormData] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJob = async (id: number) => {
      try {
        setLoading(true);
        console.log("Fetching job details for Job ID:", id);
        const response = await fetch(`/api/job/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch job details.");
        }
        const data = await response.json();
        setJob(data.data);
        console.log(job);
        setFormData(data);
      } catch (err: any) {
        setError(err.message || "Something went wrong.");
      } finally {
        setLoading(false);
      }
    };

    if (jobId) {
      fetchJob(jobId);
    }
  }, [jobId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (formData) {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`/api/job/${jobId}/edit`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Job details updated successfully!");
        const updatedJob = await response.json();
        setJob(updatedJob);
      } else {
        alert("Failed to update job details.");
      }
    } catch (error) {
      console.error("Error saving changes:", error);
    }
  };

  if (loading) {
    return (
      <div>
        <Navbar />
        <p>Loading job details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Navbar />
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Edit Job</h1>

        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">
            Current Details
          </h2>
          <div className="text-sm text-gray-600 space-y-2">
            <p>
              <strong>Company:</strong> {job?.companyName}
            </p>
            <p>
              <strong>Position:</strong> {job?.position}
            </p>
            <p>
              <strong>Applied On:</strong>{" "}
              {new Date(job?.applicationDate).toDateString()}
            </p>
            <p>
              <strong>Status:</strong> {job?.status}
            </p>
          </div>
        </div>

        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Company Name
            </label>
            <input
              type="text"
              name="companyName"
              value={formData?.companyName || ""}
              placeholder={job?.companyName}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Position
            </label>
            <input
              type="text"
              name="position"
              value={formData?.position || ""}
              placeholder={job?.position}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Application Date
            </label>
            <input
              type="date"
              name="applicationDate"
              value={formData?.applicationDate || ""}
              placeholder={job?.applicationDate}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Status
            </label>
            <select
              name="status"
              value={formData?.status || ""}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="applied">Applied</option>
              <option value="interview">Interview</option>
              <option value="offer">Offer</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </form>

        <div className="mt-6 flex justify-end space-x-4">
          <button
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md"
            onClick={() => setFormData(job)} // Reset form
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-md"
            onClick={handleSave}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default Job;
