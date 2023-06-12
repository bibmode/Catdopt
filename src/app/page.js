"use client";

import CatCard from "@/components/catcard";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import Image from "next/image";
import { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";

export default function Home() {
  const [catsListings, setCatsListings] = useState([]);
  const db = getFirestore();

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "cats"));

      querySnapshot.forEach((doc) => {
        const catListing = doc.data();
        setCatsListings([...catsListings, catListing]);
      });
    };
    // call the function
    fetchData()
      // make sure to catch any error
      .catch(console.error);
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center mb-24">
      {/* header */}
      <div className="w-full bg-pink-100 pl-24 pr-20 mt-4 mb-12 rounded-3xl flex justify-between">
        <div className="w-[650px] py-9">
          <h1 className="text-5xl font-semibold mb-4 leading-tight">
            Adopt a Cat and Bring Joy into Your Home!
          </h1>
          {/* form */}
          <div>
            <div class="flex flex-wrap -mx-3 mb-2">
              <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label
                  class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="grid-city"
                >
                  City
                </label>
                <input
                  class="appearance-none block w-full text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none bg-white focus:border-gray-500"
                  id="grid-city"
                  type="text"
                  placeholder="e.g. Butuan"
                />
              </div>
              <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label
                  class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="grid-state"
                >
                  Breed
                </label>
                <div class="relative">
                  <select
                    class="block appearance-none w-full border  text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none bg-white focus:border-gray-500"
                    id="grid-state"
                  >
                    <option>Puspin</option>
                    <option>Missouri</option>
                    <option>Texas</option>
                  </select>
                  <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg
                      class="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
              </div>
              <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label
                  class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="grid-state"
                >
                  Age
                </label>
                <div class="relative">
                  <select
                    class="block appearance-none w-full border  text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none bg-white focus:border-gray-500"
                    id="grid-state"
                  >
                    <option>Kitten</option>
                    <option>Adult</option>
                  </select>
                  <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg
                      class="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[385px] mt-2 relative">
          <Image
            src="/pet-owner.png"
            fill
            className="object-cover"
            alt="Cat lady"
          />
        </div>
      </div>
      {/* grid */}
      <div className="w-full grid grid-cols-4 gap-6">
        {catsListings?.map((cat) => (
          <CatCard data={cat} />
        ))}
      </div>
    </main>
  );
}
