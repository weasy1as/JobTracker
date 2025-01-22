"use client";
import { signOut, useSession } from "next-auth/react";
import React, { useState } from "react";

const Profile = () => {
  const { data: session } = useSession();
  const [dropdown, setDropdown] = useState(false);

  function openDropDown() {
    setDropdown(true);
  }

  function closeDropDown() {
    setDropdown(false);
  }

  const name = session?.user?.name;

  return (
    <div
      className="relative bg-black flex justify-center items-center h-[50px] w-[50px] rounded-[50%] cursor-pointer"
      onClick={openDropDown}
    >
      <h1 className="text-white">{name?.slice(0, 1).toUpperCase()}</h1>

      {dropdown && (
        <div className="absolute flex justify-center py-2 top-[70px] bg-black w-[100px] h-auto">
          <ul className="flex flex-col gap-3 text-white font-bold text-center">
            <li>
              <a href="/profile">Profile</a>
            </li>
            <li>
              <button
                className=""
                onClick={() => signOut({ callbackUrl: "/" })}
              >
                Sign Out
              </button>
            </li>
            <li>
              <button className="text-red-400" onClick={closeDropDown}>
                Close
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Profile;
