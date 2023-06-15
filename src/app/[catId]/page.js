"use client";

import { doc, getDoc, getFirestore } from "firebase/firestore";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { FaCat } from "react-icons/fa";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { MdCalendarMonth } from "react-icons/md";

const CatDetails = ({ params }) => {
  const [loading, setLoading] = useState(true);
  const [catData, setCatData] = useState(null);

  const getCatDetails = async () => {
    const db = getFirestore();
    const docRef = doc(db, "cats", params.catId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      setCatData(docSnap.data());
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }

    setLoading(false);
  };

  useEffect(() => {
    getCatDetails();
  }, []);

  return (
    <div className="mt-12 px-20 flex flex-row justify-start ">
      {loading ? (
        <p>loading</p>
      ) : (
        <>
          <div className="w-[760px]">
            {/* header image */}
            <div className="w-full h-[400px] bg-gray-200 rounded-3xl mt-2 relative">
              <div className="z-10 absolute right-5 bottom-5 bg-white/70 py-1 px-4 rounded-full border border-pink-300">
                <h3 className="text-md text-pink-500">FOR ADOPTION</h3>
              </div>
              <Image
                src={catData?.image}
                fill
                className="object-contain z-0 absolute"
                alt="Cat listing"
              />
            </div>

            {/* title */}
            <div className="flex justify-between mt-8 mb-3">
              <h1 className="text-2xl">{catData?.title}</h1>
              <button className="text-4xl">
                <AiOutlineHeart />
              </button>
            </div>

            {/* info bar */}
            <div className="flex">
              <div className="flex items-center text-2xl mr-8">
                <HiOutlineLocationMarker />
                <p className="text-[16px] ml-2">{catData?.location} City</p>
              </div>
              <div className="flex items-center text-2xl mr-8">
                <MdCalendarMonth />
                <p className="text-[16px] ml-2">{catData?.age}</p>
              </div>
              <div className="flex items-center text-2xl mr-8">
                <FaCat />
                <p className="text-[16px] ml-2">{catData?.breed}</p>
              </div>
            </div>

            {/* description */}
            <p className="my-8">{catData?.description}</p>
          </div>

          {/* contact information */}
          <div className="flex-grow flex flex-col py-8 px-6 ml-8 h-[300px] rounded-3xl shadow-lg shadow-slate-600/20">
            <h3 className="text-lg font-semibold text-center">Contact Me</h3>
            <div className="flex mt-6 mb-2 flex-row items-center">
              <div className="w-14 h-14 relative rounded-full overflow-hidden">
                <Image
                  src={catData?.creatorImage}
                  fill
                  className="object-cover"
                  alt="Cat lady"
                />
              </div>
              <p className="ml-3">{catData?.creatorName}</p>
            </div>
            <p className="mb-2 mt-3">{catData?.phone}</p>
            <p className="mb-2">{catData?.facebook}</p>
            <p className="mb-2">{catData?.email}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default CatDetails;
