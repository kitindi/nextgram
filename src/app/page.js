"use client";
import { signIn } from "next-auth/react";
import glogo from "../../public/google.svg";
import SigninForm from "@/components/SigninForm";
import Image from "next/image";

export default function Home() {
  return (
    <div className=" flex  items-center justify-center h-[90%] py-16">
      <main className="w-full max-w-[800px] h-[500px]  lg:grid lg:grid-cols-2  px-12 lg:px-0">
        <div className=" h-full hidden lg:block">
          <Image src="/bannerx.png" width={9000} height={9000} className="w-full h-[500px] object-contain" alt="banner image" />
        </div>
        <div className="border border-gray-200 rounded-md h-full py-10">
          <div className="flex items-center justify-center w-full mb-4">
            <Image src="/logo-text.png" className="w-48" alt="instagram logo" width={400} height={400} />
          </div>
          <div className="px-10">
            {" "}
            <SigninForm />
          </div>
          <div className="py-10 px-12 flex flex-row items-center justify-center space-x-3">
            <span>
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256">
                <path d="M224,128a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128Z"></path>
              </svg>
            </span>
            <span className="text-slate-500">OR</span>
            <span>
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256">
                <path d="M224,128a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128Z"></path>
              </svg>
            </span>
          </div>
          <div className="px-12">
            <button
              onClick={() => signIn("nextgram", { callbackUrl: "/dashboard" })}
              className="w-full  flex flex-row text-center gap-3 px-8 py-2 bg-white text-slate-600 font-medium rounded-lg border border-neutral-400"
            >
              <Image src={glogo} width={1000} height={1000} className="max-w-6" alt="google logo" />
              Sign in with Google
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
