import Image from "next/image";
import React from "react";
import { FaSearch } from "react-icons/fa";

const Create = () => {
  return (
    <div className="flex flex-col items-center mb-24">
      <div className="w-[500px] h-[300px] bg-gray-200 rounded-xl mt-2 relative">
        <Image
          src="https://images.unsplash.com/photo-1591871937573-74dbba515c4c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8a2l0dGVufGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
          fill
          className="object-contain z-0 absolute"
          alt="Cat listing"
        />
      </div>

      {/* details form */}
      <form className="w-full md:w-1/2 px-3 mb-6 md:mb-0 mt-8 flex flex-col items-center">
        <h2 className="text-xl mb-4 font-semibold">Cat Details</h2>
        {/* title */}
        <div class="w-full">
          <label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for="grid-city"
          >
            Title
          </label>
          <input
            class="appearance-none block w-full text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none bg-white focus:border-gray-500"
            id="grid-city"
            type="text"
            placeholder="Write the title of your cat listing"
          />
        </div>
        {/* row */}
        <div className="w-full flex mt-6">
          {/* location */}
          <div class="flex-grow mr-2">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-city"
            >
              Location
            </label>
            <div className="location-form flex border rounded py-3 px-4 leading-tight focus:outline-none bg-white">
              <input
                class="appearance-none block w-full focus:outline-none leading-tight text-gray-700"
                id="grid-city"
                type="text"
                placeholder="E.g. Butuan City"
              />
              <div className="flex-shrink-0">
                <FaSearch />
              </div>
            </div>
          </div>
          {/* age */}
          <div class="flex-grow ml-2">
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
        {/* breed */}
        <div class="w-full mt-6">
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
              <option>eferfe</option>
              <option>efegtrfe</option>
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
        {/* description */}
        <div class="w-full mt-6">
          <label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for="grid-city"
          >
            Description
          </label>
          <textarea
            class="appearance-none block w-full text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none bg-white focus:border-gray-500 "
            id="grid-city"
            type="text"
            rows="5"
            placeholder="What is the story of your cat?"
          />
        </div>
        <h2 className="text-xl mb-4 mt-8 font-semibold">Contact Information</h2>
        {/* phone */}
        <div class="w-full">
          <label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for="grid-city"
          >
            Phone
          </label>
          <input
            class="appearance-none block w-full text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none bg-white focus:border-gray-500"
            id="grid-city"
            type="text"
            placeholder="09xxxxxxxxx"
          />
        </div>
        {/* Facebook link */}
        <div class="w-full mt-6">
          <label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for="grid-city"
          >
            Facebook Link
          </label>
          <input
            class="appearance-none block w-full text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none bg-white focus:border-gray-500"
            id="grid-city"
            type="text"
            placeholder="E.g. facebook.com/janedoe"
          />
        </div>
        {/* Email */}
        <div class="w-full mt-6">
          <label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for="grid-city"
          >
            Email
          </label>
          <input
            class="appearance-none block w-full text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none bg-white focus:border-gray-500"
            id="grid-city"
            type="text"
            placeholder="E.g. example@gmail.com"
          />
        </div>

        {/* buttons */}
        <div className="w-56 mt-8">
          <div className="flex mt-2 mb-2">
            <button className="flex-grow mr-1 py-2 border text-emerald-700 font-semibold border-emerald-500 hover:bg-emerald-100 rounded-xl">
              Save
            </button>
            <button className="flex-grow ml-1 py-2 border font-semibold text-red-600 border-red-500 hover:bg-red-50 rounded-xl">
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Create;
