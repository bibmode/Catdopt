"use client";

import { deleteDoc, doc, getFirestore } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { FaRegHeart } from "react-icons/fa";

function CatCard({ created = false, data, dataId }) {
  const db = getFirestore();

  useEffect(() => {
    console.log(data);
    console.log(dataId);
  }, []);

  const deleteData = async () => {
    try {
      await deleteDoc(doc(db, "cats", dataId));
      console.log("Document deleted with ID: ", dataId);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className={`w-full ${
        created ? "h-[400px]" : "h-[350px]"
      } rounded-xl overflow-hidden shadow-lg hover:shadow-xl shadow-slate-600/20  hover:-translate-y-1 duration-300 flex flex-col`}
    >
      <Link href={`/${dataId}`} className="w-full h-48 relative">
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
        {data.image && (
          <Image
            src={data.image}
            fill
            className="object-cover z-0 absolute"
            alt="Cat listing"
          />
        )}
      </Link>

      <div className="px-4 pt-3 flex justify-between items-center font-semibold">
        <Link href={`/${dataId}`} className="text-lg flex-grow">
          {data.title}
        </Link>
        <button className="text-3xl hover:text-pink-500">
          <AiOutlineHeart />
        </button>
      </div>
      <Link
        href={`/${dataId}`}
        className="px-4 h-16 flex-grow line-clamp-2 pt-2 text-left"
      >
        {data.description}
      </Link>
      <Link
        href={`/${dataId}`}
        className="px-4 py-3 flex justify-between mt-auto mb-1 text-slate-500"
      >
        <h4>{data.location} City</h4>
        <h4>•</h4>
        <h4>{data.age}</h4>
        <h4>•</h4>
        <h4>{data.breed}</h4>
      </Link>
      {/* buttons */}
      {created && (
        <div className="px-4 pb-4 flex mb-2">
          <Link
            href={`/${dataId}/edit`}
            className="flex-grow flex justify-center mr-1 py-2 border font-semibold border-slate-500 hover:bg-gray-100 rounded-xl"
          >
            Edit
          </Link>
          <button
            onClick={() => deleteData()}
            className="flex-grow ml-1 py-2 border font-semibold text-red-600 border-red-500 hover:bg-red-50 rounded-xl"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}

export default CatCard;
