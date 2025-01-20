import { signOut } from "next-auth/react";
import Link from "next/link";
import React from "react";
const Navbar = () => {
  return (
    <div className="bg-gradient-to-r from-sky-500 to-indigo-500 flex justify-between p-3">
      <div className="flex justify-center items-center gap-5">
        icon
        <Link href="/" className="text-xl font-bold">
          Blog World
        </Link>
      </div>
      <div>
        <ul className="flex gap-4 font-bold justify-center items-center text-[18px]">
          <li>
            <Link className="hover:underline" href="/">
              Home
            </Link>
          </li>
          <li>
            <Link className="hover:underline" href="/createPost">
              Create post
            </Link>
          </li>
          <li>
            <Link className="hover:underline" href="/myPosts">
              My posts
            </Link>
          </li>
          <li>
            {" "}
            <button
              className=" bg-red-500 rounded-xl p-2"
              onClick={() => signOut({ callbackUrl: "/" })}
            >
              Sign Out
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
