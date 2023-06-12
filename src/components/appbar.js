import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { HiOutlineLogout } from "react-icons/hi";

function AppBar() {
  const auth = getAuth();
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        console.log(user);
      } else setUser(null);
    });
  }, []);

  const userLogOut = () => {
    signOut(auth);
  };

  return (
    <div className="py-6 px-8 flex flex-row justify-between items-center">
      <Link href="/">
        <Image src="/logo.png" width={146.72} height={32.19} alt="logo" />
      </Link>
      <div className="flex flex-row items-center">
        {user ? (
          <>
            <Link href={"/profile"}>{user.displayName}</Link>
            <Link
              href={"/profile"}
              className="h-[36px] w-[36px] overflow-hidden rounded-full border-2 ml-2 border-slate-600"
            >
              <Image
                src={user.photoURL}
                width={36}
                height={36}
                alt="Cat with owner"
              />
            </Link>
            <button
              onClick={() => userLogOut()}
              className="ml-4 text-2xl text-slate-600"
            >
              <HiOutlineLogout />
            </button>
          </>
        ) : (
          <>
            <Link href="/login">Login</Link>
            <Link href="/login" className="text-4xl ml-2 text-slate-500">
              <FaUserCircle />
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default AppBar;
