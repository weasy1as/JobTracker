import { signOut } from "next-auth/react";
import Link from "next/link";
import React from "react";
import Profile from "./Profile";
const Navbar = () => {
  return (
    <div className="bg-gradient-to-b from-sky-500 to-indigo-500 flex justify-between p-3 mb-4">
      <div className="flex justify-center items-center gap-5">
        <Link href="/" className="text-xl  font-bold">
          Job Tracker
        </Link>
      </div>
      <div>
        <ul className="flex gap-4 font-bold justify-center items-center text-[18px] pr-8">
          <li>
            <Link className="hover:underline" href="/dashboard">
              Home
            </Link>
          </li>
          <li>
            <Link className="hover:underline" href="/addJob">
              Add Job
            </Link>
          </li>

          <li>
            <Profile />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
