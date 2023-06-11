import Image from "next/image";
import { FcGoogle } from "react-icons/fc";
import { MdFacebook } from "react-icons/md";

export default function login() {
  return (
    <div className="flex flex-row justify-center items-center h-full pb-24">
      <div className="flex flex-col items-center mr-36 w-[340px] mb-28">
        <Image src="/login-cat.png" width={72} height={72} alt="Cat" />
        <h2 className="font-semibold text-xl mt-2">
          Login or Create your Account
        </h2>
        <p className="text-center my-4">
          Sign in to CatAdopt and embark on a journey to find your new feline
          family member. Join CatAdopt today!
        </p>
        <button className="rounded-full bg-slate-200 w-80 px-10 py-2 mt-4 flex justify-between items-center hover:bg-slate-300">
          <p>Continue with Google</p>
          <div className="text-3xl">
            <FcGoogle />
          </div>
        </button>
        <button className="rounded-full bg-slate-200 w-80 px-10 py-2 mt-4 flex justify-between items-center hover:bg-slate-300">
          <p>Continue with Facebook</p>
          <div className="text-3xl text-blue-600">
            <MdFacebook />
          </div>
        </button>
      </div>
      <div className="h-[650px] w-[482px] overflow-hidden rounded-3xl">
        <Image
          src="https://images.pexels.com/photos/6001183/pexels-photo-6001183.jpeg?auto=compress&cs=tinysrgb&w=1600"
          width={482}
          height={597}
          alt="Cat with owner"
        />
      </div>
    </div>
  );
}

export async function getServerSideProps(ctx) {
  return {
    props: {
      data: null,
    },
  };
}
