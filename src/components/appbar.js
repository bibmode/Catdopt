import Image from "next/image";
import React from "react";
import { FaUserCircle } from "react-icons/fa";

function AppBar() {
  return (
    <div className="py-6 px-8 flex flex-row justify-between items-center">
      <Image src="/logo.png" width={146.72} height={32.19} alt="logo" />
      <div className="flex flex-row items-center">
        <a href="#">Login</a>
        {/* <button className="h-[36px] w-[36px] overflow-hidden rounded-full border-2 ml-4 border-slate-600">
          <Image
            src="https://images.pexels.com/photos/6001183/pexels-photo-6001183.jpeg?auto=compress&cs=tinysrgb&w=1600"
            width={36}
            height={36}
            alt="Cat with owner"
          />
        </button> */}
        <button className="text-4xl ml-4 text-slate-500">
          <FaUserCircle />
        </button>
      </div>
    </div>
  );
}

export default AppBar;
