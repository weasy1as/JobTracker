"use client";
import React, { useState } from "react";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  return (
    <div className="w-full h-screen flex justify-center items-center bg-gradient-to-r from-sky-500 to-indigo-500">
      <div className="w-[400px] h-[500px] p-5 flex flex-col  items-center bg-white rounded-xl">
        <h1 className="font-serif font-bold text-[30px]">Login</h1>
        <form
          className="flex flex-col justify-center items-center gap-4 my-auto"
          action=""
        >
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
            {loading ? "Loggin in.." : "Login"}
          </button>
          <span>
            Not registered yet? Register {""}
            <a className="underline text-blue-500" href="/register">
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

export default Login;
