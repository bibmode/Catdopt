import Image from "next/image";
import React from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { FaCat } from "react-icons/fa";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { MdCalendarMonth } from "react-icons/md";

const CatDetails = () => {
  return (
    <div className="mt-12 px-20 flex flex-row justify-start ">
      <div className="w-[760px]">
        {/* header image */}
        <div className="w-full h-[400px] bg-gray-200 rounded-3xl mt-2 relative">
          <div className="z-10 absolute right-5 bottom-5 bg-white/70 py-1 px-4 rounded-full border border-pink-300">
            <h3 className="text-md text-pink-500">FOR ADOPTION</h3>
          </div>
          <Image
            src="https://images.unsplash.com/photo-1591871937573-74dbba515c4c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8a2l0dGVufGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
            fill
            className="object-contain z-0 absolute"
            alt="Cat listing"
          />
        </div>

        {/* title */}
        <div className="flex justify-between mt-8 mb-3">
          <h1 className="text-2xl">Cat I found on the street</h1>
          <button className="text-4xl">
            <AiOutlineHeart />
          </button>
        </div>

        {/* info bar */}
        <div className="flex">
          <div className="flex items-center text-2xl mr-8">
            <HiOutlineLocationMarker />
            <p className="text-[16px] ml-2">Butuan City</p>
          </div>
          <div className="flex items-center text-2xl mr-8">
            <MdCalendarMonth />
            <p className="text-[16px] ml-2">1-2 yrs old</p>
          </div>
          <div className="flex items-center text-2xl mr-8">
            <FaCat />
            <p className="text-[16px] ml-2">Puspin</p>
          </div>
        </div>

        {/* description */}
        <p className="my-8">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum, sunt
          ex vero deserunt consequatur aut dolore praesentium accusamus
          doloremque nisi qui doloribus tenetur animi esse. Ut eius repudiandae
          modi tempore! Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Illum cupiditate vero sunt ipsam corrupti quidem obcaecati ipsum
          repellat reprehenderit praesentium! Amet eum ipsa velit obcaecati,
          alias deleniti cum beatae dicta. Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Quibusdam impedit aspernatur ipsa nemo
          doloremque qui! Nemo eligendi iusto dolores ipsum, maiores quod fugiat
          pariatur! Magni quo eaque odio in amet!
        </p>
      </div>

      {/* contact information */}
      <div className="flex-grow flex flex-col py-8 px-6 ml-8 h-[300px] rounded-3xl shadow-lg shadow-slate-600/20">
        <h3 className="text-lg font-semibold text-center">Contact Me</h3>
        <div className="flex mt-6 mb-2 flex-row items-center">
          <div className="w-14 h-14 relative rounded-full overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
              fill
              className="object-cover"
              alt="Cat lady"
            />
          </div>
          <p className="ml-3">User Name</p>
        </div>
        <p className="mb-2 mt-3">09xxxxxxxxx</p>
        <p className="mb-2">facebook.com/katnavales</p>
        <p className="mb-2">kat.navales@gmail.com</p>
      </div>
    </div>
  );
};

export default CatDetails;
