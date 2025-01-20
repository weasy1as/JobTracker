"use client";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const data = {
      username: formData.get("username"),
      password: formData.get("password"),
      name: formData.get("name"),
      email: formData.get("email"),
    };

    if (!data.name || !data.username || !data.email || !data.password) {
      setError("All fields are required.");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError("");

      const resposne = await fetch("api/user/createUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!resposne.ok) {
        setError("Wrong credentials");
        return;
      } else {
        alert("user registered succesfully");
        console.log(resposne.json());
        e.currentTarget?.reset();
      }
    } catch (error) {
      console.log(error);
    } finally {
      router.push("/");
      setLoading(false);
    }
  };
  return (
    <div className="w-full h-screen flex justify-center items-center bg-gradient-to-r from-sky-500 to-indigo-500">
      <div className="w-[400px] h-[500px] p-5 flex flex-col  items-center bg-white rounded-xl">
        <h1 className="font-serif font-bold text-[30px]">Register</h1>
        <form
          className="flex flex-col justify-center items-center gap-4 my-auto"
          action=""
          onSubmit={handleRegister}
        >
          <div className="flex flex-col gap-2 items-start">
            <label className="font-serif font-bold" htmlFor="">
              Name
            </label>{" "}
            <input
              className="border-2 border-black rounded-xl text-center"
              type="text"
              name="name"
              id=""
              placeholder="name"
            />
          </div>
          <div className="flex flex-col gap-2 items-start">
            <label className="font-serif font-bold" htmlFor="">
              Username
            </label>{" "}
            <input
              className="border-2 border-black rounded-xl text-center"
              type="text"
              name="username"
              id=""
              placeholder="username"
            />
          </div>
          <div className="flex flex-col gap-2 items-start">
            <label className="font-serif font-bold" htmlFor="">
              Email
            </label>{" "}
            <input
              className="border-2 border-black rounded-xl text-center"
              type="text"
              name="email"
              id=""
              placeholder="email"
            />
          </div>
          <div className="flex flex-col gap-2 items-start">
            <label className="font-serif font-bold" htmlFor="">
              Password
            </label>{" "}
            <input
              className="border-2 border-black rounded-xl text-center"
              type="password"
              name="password"
              id=""
              placeholder="password"
            />
          </div>
          <button
            type="submit"
            className={`p-2 px-6 font-bold text-white rounded-xl ${
              loading
                ? "bg-gradient-to-r from-sky-500 to-indigo-500 cursor-not-allowed"
                : "bg-gradient-to-r from-sky-500 to-indigo-500 "
            }`}
            disabled={loading}
          >
            {loading ? "Loading..." : "Register"}
          </button>
          <span>
            Already have an Account? Login {""}
            <a className="underline text-blue-500" href="/">
              Here
            </a>
          </span>
          {error != null ? (
            <p className="text-red-500 font-bold">{error}</p>
          ) : (
            ""
          )}
        </form>
      </div>
    </div>
  );
};

export default Register;
