"use client";
import Footer from "@/components/Footer";
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
          <div>
            <span></span>
          </div>
        </div>
      </main>
    </div>
  );
}
