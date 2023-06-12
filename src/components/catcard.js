import Image from "next/image";
import Link from "next/link";
import React from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { FaRegHeart } from "react-icons/fa";

function CatCard({ created = false, data }) {
  return (
    <Link
      href="/sdyhujgds"
      className="w-full h-[350px] rounded-xl overflow-hidden shadow-lg hover:shadow-xl shadow-slate-600/20  hover:-translate-y-1 duration-300 flex flex-col"
    >
      <div className="w-full h-48 relative">
        <div
          className={`z-10 absolute right-4 bottom-4 bg-white/70 py-1 px-3 rounded-full border  ${
            data.status ? "border-pink-300" : "border-emerald-300"
          }`}
        >
          <h3
            className={`text-xs ${
              data.status ? "text-pink-500" : "text-emerald-600"
            }`}
          >
            {data.status ? "FOR ADOPTION" : "ADOPTED"}
          </h3>
        </div>
        <Image
          src={data.image}
          fill
          className="object-cover z-0 absolute"
          alt="Cat listing"
        />
      </div>

      <div className="px-4 pt-3 flex justify-between items-center font-semibold">
        <h3 className="text-lg">{data.title}</h3>
        {!created && (
          <button className="text-3xl">
            <AiOutlineHeart />
          </button>
        )}
      </div>
      <p className="px-4 h-16 flex-grow line-clamp-2 pt-2 text-left">
        {data.description}
      </p>
      <div className="px-4 py-3 flex justify-between mt-auto mb-1 text-slate-500">
        <h4>{data.location} City</h4>
        <h4>•</h4>
        <h4>{data.age}</h4>
        <h4>•</h4>
        <h4>{data.breed}</h4>
      </div>
      {/* buttons */}
      {created && (
        <div className="px-4 py-3 flex mt-2 mb-2">
          <button className="flex-grow mr-1 py-2 border font-semibold border-slate-500 hover:bg-gray-100 rounded-xl">
            Edit
          </button>
          <button className="flex-grow ml-1 py-2 border font-semibold text-red-600 border-red-500 hover:bg-red-50 rounded-xl">
            Delete
          </button>
        </div>
      )}
    </Link>
  );
}

export default CatCard;
