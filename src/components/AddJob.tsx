"use client";
import React, { FormEvent, useState } from "react";
import Navbar from "./Navbar";
import { useSession } from "next-auth/react";

const AddJob = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const { data: session } = useSession();
  // applied, interview, offer, rejected
  const userId = session?.user.id;

  const handlesubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const form = new FormData(e.currentTarget);
    const applied = form.get("applied") != null;

    const data = {
      userId: userId,
      companyName: form.get("companyName"),
      position: form.get("position"),
      applicationDate: form.get("applicaitonDate"),
    };

    if (
      !data.companyName ||
      !data.position ||
      !data.applicationDate ||
      !applied
    ) {
      setError("All fields are required.");
      setLoading(false);
      return;
    }

    try {
      const respone = await fetch("api/job/createJob", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      });

      console.log(data);

      if (respone.ok) {
        setSuccess(true);
      }
    } catch (error) {
      console.log(error);
      return setError("something went wront");
    } finally {
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
      setLoading(false);
      setError("");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center w-full h-screen gap-3">
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          Add job
        </h1>
        {success && (
          <div className="w-[300px] h-[50px] rounded-xl flex justify-center items-center text-xl bg-green-400 font-bold">
            Job created successfully
          </div>
        )}
        <div className="mt-[30px]">
          <form
            action=""
            onSubmit={handlesubmit}
            className="w-[300px] h-[400px] flex flex-col items-center justify-between py-4 border-black border-2"
          >
            <div className="flex flex-col">
              <label htmlFor="">Company Name</label>
              <input
                className="border-2 p-2 border-black rounded-xl"
                type="text"
                name="companyName"
                id=""
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="">Position</label>
              <input
                className="border-2 p-2 border-black rounded-xl"
                type="text"
                name="position"
                id=""
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="">Application Date</label>
              <input
                className="border-2 p-2 border-black rounded-xl"
                type="date"
                name="applicaitonDate"
                id=""
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="">Job Applied?</label>
              <input
                className="border-2 p-2 border-black rounded-xl"
                type="checkbox"
                name="applied"
                id=""
              />
            </div>
            <button
              type="submit"
              className={`p-2 rounded-xl mb-4 ${
                loading
                  ? "bg-blue-500 cursor-not-allowed"
                  : "bg-blue-300 hover:bg-indigo-500 hover:text-white"
              }`}
              disabled={loading}
            >
              {loading ? "Loading.." : "Add Job"}
            </button>
            {error != null ? (
              <p className="text-red-500 font-bold">{error}</p>
            ) : (
              ""
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddJob;
