"use client";

import CatCard from "@/components/catcard";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { HiOutlinePlus } from "react-icons/hi";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  collection,
  getDocs,
  getFirestore,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";

const Profile = () => {
  const auth = getAuth();
  const db = getFirestore();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [toggleListing, setToggleListing] = useState(true);

  const [catsListings, setCatsListings] = useState([]);
  const [catsIds, setCatsIds] = useState([]);
  const [catsFavorites, setCatsFavorites] = useState([]);
  const [catsIdsFavorites, setCatsIdsFavorites] = useState([]);

  const [test, setTest] = useState([]);

  const refreshPage = () => {
    router.replace(router.pathname);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        const qFavorites = query(
          collection(db, "cats"),
          where("favoritedBy", "array-contains", user.uid)
        );

        const unsubscribeFavorites = onSnapshot(qFavorites, (querySnapshot) => {
          const dataArray = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setCatsFavorites(dataArray);
          console.log("-----" + dataArray);
        });

        const qCreated = query(
          collection(db, "cats"),
          where("createdBy", "==", user.uid)
        );

        const unsubscribeCreated = onSnapshot(qCreated, (querySnapshot) => {
          const dataArray = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setCatsListings(dataArray);
          console.log("-----" + dataArray);
        });
      } else setUser(null);
    });
  }, []);

  useEffect(() => {
    console.log(loading);
    console.log(catsListings);
    if (loading) setLoading(false);
  }, [catsListings]);

  useEffect(() => {
    if (user) {
      const fetchData = async () => {
        setLoading(true);
        const q = query(
          collection(db, "cats"),
          where("creatorId", "==", auth.currentUser?.uid)
        );
        const qFavorites = query(
          collection(db, "cats"),
          where("favoritedBy", "array-contains", auth.currentUser?.uid)
        );

        try {
          const querySnapshot = await getDocs(q);
          const data = querySnapshot.docs.map((doc) => doc.data());
          const dataIds = querySnapshot.docs.map((doc) => doc.id);
          setCatsListings(data);
          setCatsIds(dataIds);

          const queryFavoritesSnapshot = await getDocs(qFavorites);
          const dataFavorites = queryFavoritesSnapshot.docs.map((doc) =>
            doc.data()
          );
          const dataIdsFavorites = queryFavoritesSnapshot.docs.map(
            (doc) => doc.id
          );
          setCatsFavorites(dataFavorites);
          setCatsIdsFavorites(dataIdsFavorites);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      // call the function
      fetchData();
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center">
      <div className="w-24 h-24 mt-12 relative rounded-full overflow-hidden">
        <Image
          src={user?.photoURL}
          fill
          className="object-cover"
          alt="user image"
        />
      </div>
      <h2 className="font-bold text-xl my-2">{user?.displayName}</h2>
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
        <Link
          href="/create"
          className="py-2 px-4 rounded-full border border-slate-600 hover:border-pink-400 hover:bg-pink-50 hover:text-pink-500 flex items-center"
        >
          <h4 className="mr-4">Add new listing</h4>
          <HiOutlinePlus className="text-xl" />
        </Link>
      </div>
      {/* grid */}
      {toggleListing ? (
        <div className="w-full grid grid-cols-4 gap-6 mb-24">
          {!loading &&
            catsListings?.map((catListing, index) => (
              <CatCard
                key={`cat-${index}`}
                indexOfId={index}
                data={catListing}
                dataId={catsIds[index]}
                created={true}
                refreshPage={refreshPage}
                catsFavorites={catsFavorites}
                setCatsFavorites={setCatsFavorites}
                catsIdsFavorites={catsIdsFavorites}
                setCatsIdsFavorites={setCatsIdsFavorites}
                showHeart={false}
              />
            ))}
        </div>
      ) : (
        <div className="w-full grid grid-cols-4 gap-6 mb-24">
          {!loading &&
            catsFavorites?.map((cat, index) => (
              <CatCard
                key={`cat-2-${index}`}
                data={cat}
                indexOfId={index}
                dataId={catsIdsFavorites[index]}
                created={false}
                favoriteInit={true}
                refreshPage={refreshPage}
                catsFavorites={catsFavorites}
                setCatsFavorites={setCatsFavorites}
                catsIdsFavorites={catsIdsFavorites}
                setCatsIdsFavorites={setCatsIdsFavorites}
              />
            ))}
        </div>
      )}
    </div>
  );
};

export default Profile;
