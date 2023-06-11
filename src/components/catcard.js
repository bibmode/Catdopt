import Image from "next/image";
import React from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { FaRegHeart } from "react-icons/fa";

function CatCard({ created = false }) {
  return (
    <button className="w-full rounded-xl overflow-hidden shadow-lg hover:shadow-xl shadow-slate-600/20  hover:-translate-y-1 duration-300">
      <div className="w-full h-48 relative">
        <div className="z-10 absolute right-4 bottom-4 bg-white/70 py-1 px-3 rounded-full border border-pink-300">
          <h3 className="text-xs text-pink-500">FOR ADOPTION</h3>
        </div>
        <Image
          src="https://images.pexels.com/photos/6001183/pexels-photo-6001183.jpeg?auto=compress&cs=tinysrgb&w=1600"
          fill
          className="object-cover z-0 absolute"
          alt="Cat listing"
        />
      </div>
      <div className="px-4 py-3">
        <div className="flex justify-between items-center font-semibold">
          <h3 className="text-lg">Cat I found on the street</h3>
          {!created && (
            <button className="text-3xl">
              <AiOutlineHeart />
            </button>
          )}
        </div>
        <p className="line-clamp-2 my-2 text-left">
          Lorem suscipit deserunt officia temporibus iste ex molestias nesciunt
          explicabo enim? Perferendis.
        </p>
        <div className="flex justify-between my-3 text-slate-500">
          <h4>Butuan City</h4>
          <h4>•</h4>
          <h4>1-2 yrs old</h4>
          <h4>•</h4>
          <h4>Puspin</h4>
        </div>
        {/* buttons */}
        {created && (
          <div className="flex mt-2 mb-2">
            <button className="flex-grow mr-1 py-2 border font-semibold border-slate-500 hover:bg-gray-100 rounded-xl">
              Edit
            </button>
            <button className="flex-grow ml-1 py-2 border font-semibold text-red-600 border-red-500 hover:bg-red-50 rounded-xl">
              Delete
            </button>
          </div>
        )}
      </div>
    </button>
  );
}

export default CatCard;
