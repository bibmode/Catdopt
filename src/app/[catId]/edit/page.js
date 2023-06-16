"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaRegImage, FaSearch } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import firebase from "firebase/compat/app";
import "firebase/firestore";
// Required for side-effects
import {
  collection,
  addDoc,
  getFirestore,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { useForm } from "react-hook-form";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { HiOutlineUpload } from "react-icons/hi";
import CatDetails from "../page";

const Create = ({ params }) => {
  const auth = getAuth();
  const router = useRouter();
  const [user, setUser] = useState(null);

  const [breed, setBreed] = useState("Puspin");
  const [age, setAge] = useState("Kitten");
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [adoptionStatus, setAdoptionStatus] = useState(null);
  const [catData, setCatData] = useState(null);
  const [title, setTitle] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const db = getFirestore();

  const getCatDetails = async () => {
    const docRef = doc(db, "cats", params.catId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      setCatData(docSnap.data());
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        router.push("/", undefined, { shallow: true });
      }
    });

    getCatDetails();
  }, []);

  const uploadImage = (imageData) => {
    const storage = getStorage();
    const imageName = imageData.name;
    const storageRef = ref(storage, imageName);

    // 'file' comes from the Blob or File API
    if (imageData) {
      uploadBytes(storageRef, imageData).then((snapshot) => {
        console.log("Uploaded a blob or file!");
        getDownloadURL(snapshot.ref).then((url) => {
          setImageUrl(url);
        });
      });
    }
  };

  const updateCatDB = async (data) => {
    console.log("this is working");
    const catRef = doc(db, "cats", params.catId);

    try {
      await updateDoc(catRef, {
        creatorImage: user.photoURL,
        creatorName: user.displayName,
        image: imageUrl ? imageUrl : catData.image,
        title: data.title,
        age: data.age,
        breed: data.breed,
        location: data.location,
        description: data.description,
        email: data.email,
        facebook: data.facebook,
        phone: data.phone,
        status: data.status,
      });

      console.log("Document edited ");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const onSubmit = async (data) => {
    updateCatDB(data);
  };

  const onInvalid = async (data) => {
    console.log(data);
  };

  return (
    <div className="flex flex-col items-center mb-24">
      {/* details form */}
      {catData ? (
        <form
          onSubmit={handleSubmit(onSubmit, onInvalid)}
          className="w-full md:w-1/2 px-3 mb-6 md:mb-0 mt-8 flex flex-col items-center"
        >
          <label
            className="w-[500px] flex items-center justify-center h-[300px] mb-8 bg-gray-200 rounded-xl mt-2 relative cursor-pointer"
            htmlFor="file-upload"
          >
            <input
              {...register("image", { required: false })}
              type="file"
              accept="image/*"
              id="file-upload-2"
              hidden={true}
              onChange={(e) => {
                uploadImage(e.target.files[0]);
                setImage(e.target.files[0]);
              }}
            />
            <Image
              src={image ? URL.createObjectURL(image) : catData.image}
              alt="cat image"
              fill
              className="object-contain z-0 absolute"
            />
          </label>

          <h2 className="text-xl mb-4 font-semibold">Cat Details</h2>
          {/* status */}
          <div className="flex-grow mt-2 mb-6 w-full">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-state"
            >
              Adoption Status
            </label>
            <div className="relative">
              <select
                {...register("status")}
                className="block appearance-none w-full border  text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none bg-white focus:border-gray-500"
                id="grid-state"
                defaultValue={catData?.status ? "For Adoption" : "Adopted"}
              >
                <option>For Adoption</option>
                <option>Adopted</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
          {/* title */}
          <div className="w-full">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-city"
            >
              Title
            </label>
            <input
              {...register("title", { required: true, maxLength: 50 })}
              className="appearance-none block w-full text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none bg-white focus:border-gray-500"
              id="grid-city"
              type="text"
              placeholder="Write the title of your cat listing"
              defaultValue={catData?.title}
            />
            {errors.title?.type === "required" && (
              <p role="alert" className="text-red-600 italic text-xs mt-2">
                *This field is required
              </p>
            )}
            {errors.title?.type === "maxLength" && (
              <p role="alert" className="text-red-600 italic text-xs mt-2">
                Must be less than 50 characters
              </p>
            )}
          </div>
          {/* row */}
          <div className="w-full flex mt-6">
            {/* location */}
            <div className="flex-grow mr-2">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-city"
              >
                Location
              </label>
              <div className="location-form flex border rounded py-3 px-4 leading-tight focus:outline-none bg-white">
                <input
                  {...register("location", { required: true })}
                  className="appearance-none block w-full focus:outline-none leading-tight text-gray-700"
                  id="grid-city"
                  type="text"
                  placeholder="E.g. Butuan City"
                  defaultValue={catData ? catData.location : ""}
                />
                <div className="flex-shrink-0">
                  <FaSearch />
                </div>
              </div>
              {errors.location?.type === "required" && (
                <p role="alert" className="text-red-600 italic text-xs mt-2">
                  *This field is required
                </p>
              )}
            </div>
            {/* age */}
            <div className="flex-grow ml-2">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-state"
              >
                Age
              </label>
              <div className="relative">
                <select
                  {...register("age")}
                  onChange={(e) => setAge(e.target.value)}
                  className="block appearance-none w-full border  text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none bg-white focus:border-gray-500"
                  id="grid-state"
                  defaultValue={catData?.age}
                >
                  <option>Kitten</option>
                  <option>Adult</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
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
          <div className="w-full mt-6">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-state"
            >
              Breed
            </label>
            <div className="relative">
              <select
                {...register("breed")}
                onChange={(e) => setBreed(e.target.value)}
                className="block appearance-none w-full border  text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none bg-white focus:border-gray-500"
                id="grid-state"
                defaultValue={catData?.breed}
              >
                <option>Puspin</option>
                <option>Siamese</option>
                <option>British Shorthair</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
          {/* description */}
          <div className="w-full mt-6">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-city"
            >
              Description
            </label>
            <textarea
              {...register("description", { required: true })}
              className="appearance-none block w-full text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none bg-white focus:border-gray-500 "
              id="grid-city"
              type="text"
              rows="5"
              placeholder="What is the story of your cat?"
              defaultValue={catData?.description}
            />
            {errors.description?.type === "required" && (
              <p role="alert" className="text-red-600 italic text-xs mt-2">
                *This field is required
              </p>
            )}
          </div>
          <h2 className="text-xl mb-4 mt-8 font-semibold">
            Contact Information
          </h2>
          {/* phone */}
          <div className="w-full">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-city"
            >
              Phone
            </label>
            <input
              {...register("phone", {
                required: true,
                pattern:
                  /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/i,
              })}
              className="appearance-none block w-full text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none bg-white focus:border-gray-500"
              id="grid-city"
              type="number"
              placeholder="09xxxxxxxxx"
              defaultValue={catData?.phone}
            />
            {errors.phone?.type === "required" && (
              <p role="alert" className="text-red-600 italic text-xs mt-2">
                *This field is required
              </p>
            )}
            {errors.phone?.type === "pattern" && (
              <p role="alert" className="text-red-600 italic text-xs mt-2">
                *Enter a valid phone number
              </p>
            )}
          </div>
          {/* Facebook link */}
          <div className="w-full mt-6">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-city"
            >
              Facebook Link
            </label>
            <input
              {...register("facebook")}
              className="appearance-none block w-full text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none bg-white focus:border-gray-500"
              id="grid-city"
              type="text"
              placeholder="E.g. facebook.com/janedoe"
              defaultValue={catData?.facebook}
            />
          </div>
          {/* Email */}
          <div className="w-full mt-6">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-city"
            >
              Email
            </label>
            <input
              {...register("email")}
              className="appearance-none block w-full text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none bg-white focus:border-gray-500"
              id="grid-city"
              type="text"
              placeholder="E.g. example@gmail.com"
              defaultValue={catData?.email}
            />
          </div>
          {/* buttons */}
          <div className="w-56 mt-8">
            <div className="flex mt-2 mb-2">
              <button
                type="submit"
                className="flex-grow mr-1 py-2 border text-emerald-700 font-semibold border-emerald-500 hover:bg-emerald-100 rounded-xl"
              >
                Save
              </button>
              <button className="flex-grow ml-1 py-2 border font-semibold text-red-600 border-red-500 hover:bg-red-50 rounded-xl">
                Cancel
              </button>
            </div>
          </div>
        </form>
      ) : (
        <p>loading...</p>
      )}
    </div>
  );
};

export default Create;
