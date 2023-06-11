"use client";

import CatCard from "@/components/catcard";
import Image from "next/image";
import React, { useState } from "react";
import { HiOutlinePlus } from "react-icons/hi";

const Profile = () => {
  const [toggleListing, setToggleListing] = useState(true);

  return (
    <div className="flex flex-col items-center">
      <div className="w-24 h-24 mt-12 relative rounded-full overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
          fill
          className="object-cover"
          alt="Cat lady"
        />
      </div>
      <h2 className="font-bold text-xl my-2">Username</h2>
      <div className="mt-8 mb-10 bg-zinc-100 py-2 rounded-full relative h-12 w-80">
        <div
          className={`w-40 absolute z-0 top-0 left-0 ${
            toggleListing ? "translate-x-0" : "translate-x-full"
          } duration-300 h-full bg-white rounded-full border border-gray-700`}
        ></div>
        <div className="flex text-lg text-center font-semibold absolute z-10 left-0">
          <button onClick={() => setToggleListing(true)} className="w-40">
            Your listings
          </button>
          <button onClick={() => setToggleListing(false)} className="w-40">
            Favorited
          </button>
        </div>
      </div>
      <div className="flex w-full justify-end mb-8">
        <button className="py-2 px-4 rounded-full border border-slate-600 hover:border-pink-400 hover:bg-pink-50 hover:text-pink-500 flex items-center">
          <h4 className="mr-4">Add new listing</h4>
          <HiOutlinePlus className="text-xl" />
        </button>
      </div>
      {/* grid */}
      {toggleListing ? (
        <div className="w-full grid grid-cols-4 gap-6 mb-24">
          <CatCard created={true} />
          <CatCard created={true} />
          <CatCard created={true} />
        </div>
      ) : (
        <div className="w-full grid grid-cols-4 gap-6 mb-24">
          <CatCard />
          <CatCard />
          <CatCard />
          <CatCard />
          <CatCard />
          <CatCard />
          <CatCard />
        </div>
      )}
    </div>
  );
};

export default Profile;
